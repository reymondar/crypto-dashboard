import style from "./Selector.module.scss"
import { useRef, useState } from "react"
import { Input } from "../Input/Input"

interface Coin {
    symbol: string,
    current_price: string
}

type selectorProps = {
    showPrice: boolean,
    coin: Coin,
    setCoin: () => Coin
}

export const Selector = ({showPrice, coin, setCoin}: selectorProps) => {
    
    const [modal,setModal] = useState(false)

    const inputRef = useRef(null)

    const handleForm = e => {
        setModal(prev =>!prev)
        
        inputRef.current?.focus()
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
            <Input handleClick={setCoin} ref={inputRef} />
        </div>
    </div>
    }
    <div className={style.coin}>
        <div className={style.selector} onClick={handleForm} >
        <img src={coin?.image} alt={coin?.name} style={{ width: "20px" }} />
        <h2>{coin && coin.symbol?.toUpperCase()}</h2>
        <span>▼</span>
        </div>
        {showPrice && <p>{coin?.current_price}</p>}
    </div>
    </>
    )
}