import { useContext } from "react";
import { coinContext } from "../dashboard/Dashboard";
import { useQuery } from "react-query";
import { LineChart } from "../Charts/LineChart";
import styles from "./Board.module.scss";
import { Loader } from "../Loader/Loader";
import Image from "next/image";
import axios from "@/axios"

type Currency = {
  price: string,
  id: string
};


type CoinProps = {
  name: string,
  fullColor: string,
  halfColor: string
};

export const Board = ({ name , fullColor , halfColor }: CoinProps) => {

  const coinDB = useContext(coinContext)
  
  const [ coinData ] = coinDB.filter((coins: Currency) => coins.id === name)

  const fetchGraphh = async () => {
    try {
      const response = await axios.get(`coins/${name}/market_chart?vs_currency=usd&days=7&interval=daily`)
      console.log(response.data)
      return response.data
    }
    catch(error) {
      console.log(error)
    }
  }
  const graphQuery = useQuery(["graph", name], fetchGraphh);

  if (graphQuery.isLoading) {
    return (
      <div className={styles.container}>
        <Loader />
      </div>
    );
  }

  if (graphQuery.isError)
    return (
    <div className={styles.container}>
      <p>Error. Please reload</p>
    </div>
    )
    
  //Taking out market cap & decimals from prices
    const chartData: number[] = graphQuery.data.prices.map((price: number[]) =>
      price.shift()?.toFixed(2)
    );

    const {
      image,
      symbol,
      current_price,
      price_change_percentage_24h,
    }: {
      image: string;
      symbol: string;
      current_price: string,
      price_change_percentage_24h: string;
    } = coinData

    const percentage = Number(price_change_percentage_24h);

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Image src={image} alt="thumbnail" width={20} height={20} />
          <div className={styles.titles}>
            <h1>{name}</h1>
            <p>{symbol}</p>
          </div>
        </div>
        <div className={styles.graph}>
          <LineChart price={chartData} fullColor={fullColor} halfColor={halfColor} />
        </div>
        <div className={styles.footer}>
          <h2>${current_price}</h2>
          <span>
            {percentage > 0 ? `+${percentage}` : `${percentage}`}
            {percentage > 0 ? "↗ " : "↘"}
          </span>
        </div>
      </div>
    );
  
};
