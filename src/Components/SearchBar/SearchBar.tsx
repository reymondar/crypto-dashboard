import { useRef } from "react";
import { Input } from "../Input/Input";
import style from "./SearchBar.module.scss"

type barProps = {
  setCoin?: (coin: string) => void;
};
export const SearchBar = ({ setCoin }: barProps) => {
  
  const ref = useRef(null)
  
  const handleClick = (coin) => {
    ref.current.focus();
    //set the coin in the index.ts
    setCoin(coin.id);
  };

  return (
    <div className={style.searchBar}>
    <div>
      <h1>Dashboard</h1>  
      <p>Welcome back <b>Reymond</b></p>
    </div>
    <form className={style.form}>
      <Input handleClick={handleClick} ref={ref} />
    </form>
    </div>
  );
};
