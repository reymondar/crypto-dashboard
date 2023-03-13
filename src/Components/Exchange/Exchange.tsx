import Image from "next/image";
import { Selector } from "../Selector/Selector";
import style from "./Exchange.module.scss";

export const Exchange = () => {


  const handleClick = () => {

  }

  return (
    <div className={style.container}>
      <div className={style.title}>
        <h1>Exchange</h1>
        <div>
          <button className={style.active}>Buy</button>
          <button>Sell</button>
        </div>
      </div>
      <div className={`${style.selector} ${style.from}`}>
        <h1>From</h1>
        <Selector />
      </div>
      <div className={style.image}>
        <Image src="/repeat.png" alt="change" width={25} height={25} onClick={handleClick}/>
      </div>
      <div className={`${style.selector} ${style.to}`}>
        <h1>To</h1>
        <Selector />
      </div>
      <div className={style.submit}>
        <p>1BTC = $22,741.01</p>
        <button>Exchange Now</button>
      </div>
    </div>
  );
};
