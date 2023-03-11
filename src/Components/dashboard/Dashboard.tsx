import { SearchBar } from "../SearchBar/SearchBar";
import { Board } from "../Board/Board";
import { Exchange } from "../Exchange/Exchange";
import { useQuery } from "react-query";
import { useState, createContext } from "react";

export const Dashboard = () => {
  const [actualCoin, setActualCoin] = useState("bitcoin");

  const [coinDB, setCoinDB] = useState([]);
  const coinContext = createContext([]);

  const fetchCoinList = () => {
    return fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
    ).then((res) => {
      if (!res.ok) throw new Error("coins fetch failed");
      else {
        return res.json();
      }
    });
  };

  const { data, isLoading, isError } = useQuery("coinList", fetchCoinList);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something happened. Refresh</div>;
  }

  setCoinDB(data);

  return (
    <coinContext.Provider value={coinDB}>
      <div>
        <SearchBar setCoin={setActualCoin} />
      </div>
      <div>
        <h1>hi</h1>
        {/*<Board coin={actualCoin} />*/}
      </div>
      <Exchange coin={actualCoin} />
    </coinContext.Provider>
  );
};
