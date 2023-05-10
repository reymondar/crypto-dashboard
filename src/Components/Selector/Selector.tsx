import style from "./Selector.module.scss"
import { SetStateAction, useEffect, useContext, useState } from "react"
import { Input } from "../Input/Input"
import Image from "next/image"
import { coinContext } from "../dashboard/Dashboard"
import { Actions } from "../Exchange/Exchange"

interface Coin {
    id: string,
    symbol: string,
    current_price: string,
    image: string,
    name:string
}

type selectorProps = {
    showPrice: boolean,
    currency: Coin,
    direction?: "FROM" | "TO"
    dispatch?: React.Dispatch<Actions> 
    graphCoin?: React.Dispatch<SetStateAction<Coin>>
}


export const Selector = ({showPrice, currency , direction , dispatch , graphCoin}: selectorProps) => {
    
    const [actualCoin, setActualCoin] = useState('')
    
    const [modal,setModal] = useState(false)

    const coinDB = useContext(coinContext)


    useEffect(()=>{
        const selected: Coin[] = coinDB.filter((coin: Coin) => {
            return coin.id === actualCoin
        }) 
        
        if(selected.length >= 1) {
        const [ selectedCoin ] = selected

        const { id , symbol , current_price , image , name} = selectedCoin

        if(dispatch && direction) dispatch({type: direction, payload: {id: id , symbol: symbol , current_price: current_price , image: image , name: name} })
        
        if(graphCoin) {
            console.log('graph')
            graphCoin({id: id , symbol: symbol , current_price: current_price , image: image , name: name})
        }
        
    }
    },[actualCoin])

    const handleForm = () => {
        setModal(prev =>!prev)
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
            <Input handleClick={setActualCoin} />
        </div>
    </div>
    }
    <div className={style.coin}>
        <div className={style.selector} onClick={handleForm} >
        {currency.image && currency.name && <Image src={currency.image} alt={currency.name} width={20} height={20} />}
        <h2>{currency.symbol.toUpperCase()}</h2>
        <span>▼</span>
        </div>
        {showPrice && <p>{currency.current_price}</p>}
    </div>
    </>
    )
}