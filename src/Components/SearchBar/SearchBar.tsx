import { useRef } from "react";
import { Input } from "../Input/Input";
import style from "./SearchBar.module.scss"

type barProps = {
  setCoin: React.Dispatch<string>;
};
export const SearchBar = ({ setCoin }: barProps) => {
  

  const handleClick = (id: string) => {
    //set the coin in the index.ts
    setCoin(id) 
  };

  return (
    <div className={style.searchBar}>
    <div>
      <h1>Dashboard</h1>  
      <p>Welcome back <b>Reymond</b></p>
    </div>
    <form className={style.form}>
      <Input handleClick={handleClick}/>
    </form>
    </div>
  );
};
