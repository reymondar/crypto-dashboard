import { SearchBar } from "../SearchBar/SearchBar";
import { Board } from "../Board/Board";
import { Exchange } from "../Exchange/Exchange";
import { useQuery } from "react-query";
import { useState, createContext } from "react";
import { Wrapper } from "../Wrapper/Wrapper";
import { BigGraph } from "../BigGraph/BigGraph";
import style from "./Dashboard.module.scss"
import axios from "@/axios";
const coinContext = createContext([])



const Dashboard = () => {
  const [actualCoin, setActualCoin] = useState("bitcoin");
  
  const fetchCoinList = async () => {
    try{
    const response = await axios.get(`coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`)
    return response.data
  }
  catch(error){
    throw new Error('so.. this happene')
  }
  }

  const { data, isLoading, isError } = useQuery("coinList", fetchCoinList);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something happened. Refresh</div>;
  }

  const bitcoin = {name: 'bitcoin' , fullColor: 'rgba(247, 147, 26,1.00)' , halfColor: 'rgba(247, 147, 26,0.3)'}
  const ethereum = {name: 'tether' , fullColor: 'rgba(0,164,120,1.00)' , halfColor: 'rgba(0,164,120,0.3)'}
  const cardano = {name: 'ethereum' , fullColor: 'rgba(120,84,223,1.00)' , halfColor: 'rgba(120,84,223,0.3)'}

  return (
    <coinContext.Provider value={data}>
      <Wrapper>
        <SearchBar setCoin={setActualCoin} />
        <div className={style.boardContainer}>
          <Board {...bitcoin} />
          <Board {...ethereum} />
          <Board {...cardano} />
        </div>
      <div className={style.exchangeContainer}>
        <Exchange />
        <BigGraph />
      </div>
      </Wrapper>
    </coinContext.Provider>
  );
};

export { Dashboard ,coinContext }