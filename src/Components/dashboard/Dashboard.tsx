import { SearchBar } from "../SearchBar/SearchBar";
import { Board } from "../Board/Board";
import { Exchange } from "../Exchange/Exchange";
import { useQuery } from "react-query";
import { useState, createContext } from "react";
import { Wrapper } from "../Wrapper/Wrapper";
import { BigGraph } from "../BigGraph/BigGraph";
import style from "./Dashboard.module.scss"

export const coinContext = createContext([])

export const Dashboard = () => {
  const [actualCoin, setActualCoin] = useState("bitcoin");
  
  const fetchCoinList = async () => {
    return await fetch(
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


  return (
    <coinContext.Provider value={data}>
      <Wrapper>
        <SearchBar setCoin={setActualCoin} />
        <div className={style.boardContainer}>
          <Board coin={actualCoin} />
          <Board coin={'ethereum'} />
          <Board coin={'reserve-rights-token'} />
            
        </div>
      <Exchange />
      <BigGraph />
      </Wrapper>
    </coinContext.Provider>
  );
};
