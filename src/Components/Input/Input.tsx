import { useState, useContext } from "react";
import { coinContext } from "../dashboard/Dashboard";
import Image from "next/image";
import style from "./Input.module.scss";

type Coins = {
  id: string;
  image: string;
};

type InputPros = {
  handleClick?: (e: string) => void;
};

export const Input = ({ handleClick }: InputPros) => {
  
  const coinDB = useContext(coinContext);

  //User search
  const [search, setSearch] = useState("");
  //Display ? open
  const [isOpen, setIsOpen] = useState(false);

  const [coinSearch, setCoinSearch] = useState([]);

  const handleChange = (e) => {
    let typed: string = e.target.value.toLowerCase().trim();
    setSearch(typed);
    setCoinSearch(coinDB.filter((coin) => coin.id.includes(typed)));
  };

  const handleFocus = () => setIsOpen((prev) => !prev);

  const sendClick = (e) => {
    e.preventDefault()
    let [coinObj] = coinDB.filter(coin => coin.id === e.target.value)
    handleClick(coinObj);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen((prev) => !prev);

      setSearch("");
      setCoinSearch([]);
    }, 300);
  };

  return (
    <div style={{width:'100%', backgroundColor:"white"}}>
      <input
        className={style.input}
        name="search"
        placeholder="Search Any Thing"
        value={search}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {isOpen
        ? 
        coinSearch.map((coin) => {
            return (
              <button
                key={coin.id}
                style={{ display: "flex" }}
                onClick={sendClick}
                value={coin.id}
              >
                {coin.name}
                <img src={coin.image} alt={coin.id} style={{ width: "20px" }} />
              </button>
            );
          })
        : ""}
    </div>
  );
};
