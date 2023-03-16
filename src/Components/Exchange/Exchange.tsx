import Image from "next/image";
import { useState } from "react";
import { Selector } from "../Selector/Selector";
import style from "./Exchange.module.scss";

export const Exchange = () => {
  const [sell, setSell] = useState(true)
  
  const [from,setFrom] = useState({symbol: "...",current_price: "0.0000000"})

  const [to,setTo] = useState({symbol: "...",current_price: "0.0000000"})
  
  const handleClick = () => setSell(prev => !prev)


  return (
    <div className={style.container}>
      <div className={style.title}>
        <h1>Exchange</h1>
        <div>
          <button 
          className={!sell ? style.active : undefined} 
          onClick={handleClick}>
          Buy
          </button>
          <button 
          className={ sell ? style.active : undefined} 
          onClick={handleClick}>
          Sell
          </button>
        </div>
      </div>
      <div className={`${style.selector} ${style.from}`}>
        <h1>From</h1>
        <Selector showPrice={true} coin={from} setCoin={setFrom} />
      </div>
      <div className={style.image}>
        <Image src="/repeat.png" alt="change" width={25} height={25} />
      </div>
      <div className={`${style.selector} ${style.to}`}>
        <h1>To</h1>
        <Selector showPrice={true} coin={to} setCoin={setTo} />
      </div>
      <div className={style.submit}>
        <p>1BTC = $22,741.01</p>
        <button>Exchange Now</button>
      </div>
    </div>
  );
};
