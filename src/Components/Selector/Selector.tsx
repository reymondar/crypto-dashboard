import style from "./Selector.module.scss"
import { SetStateAction, useEffect, useContext, useState } from "react"
import { Input } from "../Input/Input"
import Image from "next/image"
import { coinContext } from "../dashboard/Dashboard"

interface Coin {
    id: string,
    symbol: string,
    current_price: string,
    image: string,
    name:string
}

type selectorProps = {
    showPrice: boolean,
    graphCoin?: React.Dispatch<SetStateAction<{id:string,symbol:string,current_price:string}>>
}

export const Selector = ({showPrice, graphCoin}: selectorProps) => {
    
    const [actualCoin, setActualCoin] = useState('')
    const [coin,setCoin] = useState({id:'',symbol: '' , current_price: '' , image:'' , name:''})
    const [modal,setModal] = useState(false)

    const coinDB = useContext(coinContext)


    useEffect(()=>{
        const selected: Coin[] = coinDB.filter((coin: Coin) => {
            return coin.id === actualCoin
        }) 
        
        if(selected.length >= 1) {
        const [ selectedCoin ] = selected

        const { id , symbol , current_price , image , name} = selectedCoin
        setCoin({id: id , symbol: symbol , current_price: current_price , image: image , name: name})

        graphCoin ? graphCoin({id: id , symbol: symbol , current_price: current_price}) : ''
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
        {coin.image && coin.name && <Image src={coin.image} alt={coin.name} width={20} height={20} />}
        <h2>{coin && coin.symbol?.toUpperCase()}</h2>
        <span>▼</span>
        </div>
        {showPrice && <p>{coin?.current_price}</p>}
    </div>
    </>
    )
}