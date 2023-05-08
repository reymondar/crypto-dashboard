import { useState, useContext, SetStateAction} from "react";
import { coinContext } from "../dashboard/Dashboard";
import style from "./Input.module.scss";

type Coins = {
  id: string,
  image: string,
  name: string
};

type InputPros = {
  handleClick?: React.Dispatch<SetStateAction<string>>;
};

export const Input = ({ handleClick }: InputPros) => {
  
  const coinDB = useContext(coinContext);
  //User search
  const [search, setSearch] = useState("");
  //Display ? open
  const [isOpen, setIsOpen] = useState(false);

  const [coinSearch, setCoinSearch] = useState([]);

  


  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    
    let typed: string = target.value.toLowerCase().trim();
    setSearch(typed);
    
    setCoinSearch(coinDB.filter((coin: Coins) => coin.id.includes(typed)));
  };

  const handleFocus = () => {
    setIsOpen((prev) => !prev);
  }

  const sendClick = (e: React.SyntheticEvent) => {
    e.preventDefault()

    const target = e.target as HTMLButtonElement
    let [coinObj] = coinDB.filter((coin: Coins) => coin.id === target.value)
    let { id } = coinObj
    
    //Coin setter
    handleClick ? handleClick(id) : ''
  };

  const handleBlur = () => {
    setTimeout(() => {
    //  setIsOpen((prev) => !prev);

    //   setSearch("");
    //  setCoinSearch([]);
    }, 300);
  };

  return (
    <div className={style.container}>
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
        coinSearch.map((coin: Coins) => {
            return (
              <button
                key={coin.id}
                style={{background:`url("${coin.image}") no-repeat right`,backgroundSize:'2rem'}}
                onClick={sendClick}
                value={coin.id}
              >
                {coin.name}
              </button>
            );
          })
        : ""}
    </div>
  );
  };
