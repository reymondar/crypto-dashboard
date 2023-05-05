import style from "./Selector.module.scss"
import { SetStateAction, useRef, useState } from "react"
import { Input } from "../Input/Input"
import Image from "next/image"

interface Coin {
    id: string,
    symbol: string,
    current_price: string,
    image?: string,
    name?:string
}

type selectorProps = {
    showPrice: boolean,
    coin: Coin,
    setCoin: React.Dispatch<SetStateAction<Coin>>
}

export const Selector = ({showPrice, coin, setCoin}: selectorProps) => {
    
    const [modal,setModal] = useState(false)

    const inputRef = useRef(null)

    const handleForm = e => {
        setModal(prev =>!prev)
        
        inputRef.current?.focus()
    }

    const handleClose = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement
        if(!target.name) setModal(prev => !prev)
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
        {coin.image && coin.name && <Image src={coin.image} alt={coin.name} width={20} height={20} />}
        <h2>{coin && coin.symbol?.toUpperCase()}</h2>
        <span>▼</span>
        </div>
        {showPrice && <p>{coin?.current_price}</p>}
    </div>
    </>
    )
}