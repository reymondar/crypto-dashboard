import { useQuery } from "react-query";
import { LineChart } from "../Charts/LineChart";
import styles from "./Board.module.scss";
import { Loader } from "@/Loader/Loader";
type Coin = {
  price?: string;
};

type CoinProps = {
  coin: string;
};

export const Board = ({ coin }: CoinProps) => {
  const fetchCoin = (url: string): Promise<T> => {
    return fetch(`https://api.coingecko.com/api/v3/coins/${coin}`).then(
      (res) => {
        if (!res.ok) {
          throw new Error("Failed to access route");
        }
        return res.json();
      }
    );
  };

  const fetchGraph = (url: string): Promise<T> => {
    return fetch(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7&interval=daily`
    ).then((res) => {
      if (!res.ok) {
        throw new Error("Failed to load graph");
      }
      return res.json();
    });
  };

  const coinQuery = useQuery(["coin", coin], fetchCoin);
  const graphQuery = useQuery(["graph", coin], fetchGraph);

  if (coinQuery.isLoading || graphQuery.isLoading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  if (coinQuery.isError || graphQuery.isError)
    return <h1>an error has ocurred</h1>;

  //Taking out market cap & decimals from prices

  if (graphQuery) {
    const chartData: number[] = graphQuery.data.prices.map((price: number[]) =>
      price.shift()?.toFixed(2)
    );

    const {
      name,
      image,
      symbol,
      market_data: {
        current_price: { usd },
      },
      market_data: { price_change_percentage_24h },
    }: {
      name: string;
      usd: string;
      image: string;
      symbol: string;
      price_change_percentage_24h: string;
    } = coinQuery.data;

    const percentage = Number(price_change_percentage_24h);

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={image["thumb"]} alt="thumbnail" />
          <div className={styles.titles}>
            <h1>{name}</h1>
            <p>{symbol}</p>
          </div>
        </div>
        <div className={styles.graph}>
          <LineChart price={chartData} />
        </div>
        <div className={styles.footer}>
          <h2>${usd}</h2>
          <span>
            {percentage > 0 ? `+${percentage}` : `${percentage}`}
            {percentage > 0 ? "↗ " : "↘"}
          </span>
        </div>
      </div>
    );
  }
};
