import { useRef } from "react";
import { Input } from "../Input/Input";
import style from "./SearchBar.module.scss"

type barProps = {
  setCoin: React.Dispatch<string>;
};
export const SearchBar = ({ setCoin }: barProps) => {
  

  return (
    <div className={style.searchBar}>
    <div>
      <h1>Dashboard</h1>  
      <p>Welcome back <b>Reymond</b></p>
    </div>
    <form className={style.form}>
      <Input handleClick={setCoin}/>
    </form>
    </div>
  );
};
