import React from "react";
import { Input } from "../Input/Input";
import style from "./SearchBar.module.scss"

type barProps = {
  setCoin?: (coin: string) => void;
};
export const SearchBar = ({ setCoin }: barProps) => {
  
  
  const handleClick = (coin) => {
    //set the coin in the index.ts
    setCoin(coin.id);
  };

  return (
    <div className={style.searchBar}>
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back<b>Reymond</b></p>
    </div>
    <form style={{position:'absolute'}}>
      <Input handleClick={handleClick} />
    </form>
    </div>
  );
};
