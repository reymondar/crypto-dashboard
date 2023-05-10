import Image from "next/image";
import { useReducer, useState } from "react";
import { Selector } from "../Selector/Selector";
import style from "./Exchange.module.scss";

 type Currency = {
    id: string,
    symbol: string,
    current_price: string,
    image: string,
    name:string
 }

 type State = {
  FROM: Currency,
  TO: Currency
 }



export type Actions = 
| { type: "FROM", payload: {id: string, symbol: string, current_price: string, image: string, name:string}}
| { type: "TO", payload: {id: string, symbol: string, current_price: string, image: string, name:string}}
| { type: "SWAP" , payload: {}}

const reducer = (coins: State , action: Actions) => {
  const { type, payload } = action
  console.log(type,payload)
  switch(type) {
    case "FROM": 
    return {...coins, 
      [type] : payload  
    }
    case "TO":
    return {...coins, 
      [type] : payload 
    }
    case "SWAP":
      const coinsArr = Object.values(coins).reverse()
      return {
        "FROM": coinsArr[0],
        "TO": coinsArr[1]
      }
    default:
      return coins
  }
}

const initialState = {
  FROM: {id:'',symbol: '' , current_price: '' , image:'' , name:''},
  TO: {id:'',symbol: '' , current_price: '' , image:'' , name:''}
}

export const Exchange = () => {
  const [sell, setSell] = useState(true)
  const [coins , dispatch] = useReducer(reducer, initialState)
  
  console.log(coins)

  const handleClick = () => setSell(prev => !prev)

  const handleSwap = () => dispatch({type: "SWAP", payload: {}})
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
        <Selector showPrice={true} direction="FROM" currency={coins["FROM"]} dispatch={dispatch} />
      </div>
      <div className={style.image}>
        <Image src="/repeat.png" alt="change" width={25} height={25} onClick={handleSwap} />
      </div>
      <div className={`${style.selector} ${style.to}`}>
        <h1>To</h1>
        <Selector showPrice={true} direction="TO" currency={coins["TO"]} dispatch={dispatch} />
      </div>
      <div className={style.submit}>
        <p>1BTC = $22,741.01</p>
        <button>Exchange Now</button>
      </div>
    </div>
  );
};
