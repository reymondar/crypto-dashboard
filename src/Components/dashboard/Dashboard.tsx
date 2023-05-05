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

  const days = ['Monday','Tuesday','Wednesday','Thurdsay','Friday','Saturday','Sunday']

  const reOrderDays = (days: string[]) => {
    
    const today = new Date()
    const todayIndex = today.getDay()

    const elementsIndex = todayIndex + 1
    const elementsToRemove = 7 - todayIndex
    const elementsRemoved = days.splice(todayIndex,elementsToRemove)

    const dateReOrdered = elementsRemoved.concat(days)

    console.log(dateReOrdered)
    return dateReOrdered
    
  }

  reOrderDays(days)


  const bitcoin = {name: 'bitcoin' , fullColor: 'rgba(247, 147, 26,1.00)' , halfColor: 'rgba(247, 147, 26,0.3)'}
  const ethereum = {name: 'ethereum' , fullColor: 'rgba(158,182,184,1.00)' , halfColor: 'rgba(158,182,184,0.3)'}
  const cardano = {name: 'cardano' , fullColor: 'rgba(42, 113, 208,1.00)' , halfColor: 'rgba(42, 113, 208,0.3)'}

  return (
    <coinContext.Provider value={data}>
      <Wrapper>
        <SearchBar setCoin={setActualCoin} />
        <div className={style.boardContainer}>
          <Board {...bitcoin} />
          <Board {...ethereum} />
          <Board {...cardano} />
        </div>
      <Exchange />
      <BigGraph />
      </Wrapper>
    </coinContext.Provider>
  );
};
