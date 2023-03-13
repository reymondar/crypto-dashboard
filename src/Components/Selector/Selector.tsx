import style from "./Selector.module.scss"
import Image from "next/image"
import { useState } from "react"
import { Input } from "../Input/Input"
export const Selector = () => {
    
    const [coin,setCoin] = useState({symbol: "btc",current_price: "0.0000000"})
    const [modal,setModal] = useState(false)

    const handleClick = e => {
        setModal(prev =>!prev)
    }

    const handleClose = (e) => {
        if(!e.target.name) setModal(prev => !prev)
    }

    return(
    <> 
    {
    modal && 
    <div className={style.background} onClick={handleClose}>
        <div className={style.modal}>
            <Input handleClick={setCoin} />
        </div>
    </div>
    }
    <div className={style.coin}>
        <div className={style.selector} onClick={handleClick} >
        <img src={coin?.image} alt={coin?.name} style={{ width: "20px" }} />
        <h2>{Object.keys({coin}).length !== 0 ? coin.symbol.toUpperCase() : "Select"}</h2>
        <span>▼</span>
        </div>
        <p>{coin.current_price}</p>
    </div>
    </>
    )
}