import { useState, useContext , useRef , forwardRef} from "react";
import { coinContext } from "../dashboard/Dashboard";
import style from "./Input.module.scss";

type Coins = {
  id: string;
  image: string;
};

type InputPros = {
  handleClick?: (e: string) => void;
};

export const Input = forwardRef<HTMLDivElement>(function Input ({ handleClick }: InputPros, ref) {
  
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

  const handleFocus = () => {
    setIsOpen((prev) => !prev);
  }

  const sendClick = (e) => {
    e.preventDefault()

    let [coinObj] = coinDB.filter(coin => coin.id === e.target.value)
    
    //Coin setter
    handleClick(coinObj);
  };

  const handleBlur = () => {
    setTimeout(() => {
     // setIsOpen((prev) => !prev);

      //setSearch("");
     // setCoinSearch([]);
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
        ref={ref}
      />
      {isOpen
        ? 
        coinSearch.map((coin) => {
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
});
