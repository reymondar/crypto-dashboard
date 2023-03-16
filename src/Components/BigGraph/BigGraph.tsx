import { MainChart } from "../Charts/MainChart"
import { Selector } from "../Selector/Selector"
import style from "./BigGraph.module.scss"
import { useState , useReducer , useEffect } from "react"
import { useQuery } from "react-query"
import { Loader } from "../Loader/Loader"

type reducerProps = {
    split: number[],
    date: number
}



//Funcion para crear los labels del gráfico
const arrayGenerator = (days:number) => {
    let labels = []

    let today = new Date()

    let index = 1
    for(index; index <= 365; index++) {

    if(index % days == 0) {

    let dayOffset = (24*60*60*1000) * days
    let date = today.setTime(today.getTime() + dayOffset)

    let newDate = new Date(date) 
    
    const label = `${newDate.getDate()} /${newDate.getMonth() + 1} /${newDate.getFullYear()}`    
    labels.push(label)
    }
    }
    return [labels]
}



const reduceSetter = (num: number) => {
    const [labels] = arrayGenerator(num)

    return {
        days: labels,
        interval: num
    }
}

const labelReducer = (timeLapse, action ) => {
    switch(action.type) {
        case 'Day':{
            return reduceSetter(1)
        }
        case 'Week':{
            return reduceSetter(7)
           
        }
        case 'Month':{
            return reduceSetter(30)
        }      
    }
}

export const BigGraph = () => {
    
    //Init value redundant created by useEffect hook
    const [timeLapse, dispatch] = useReducer(labelReducer, {days: 1, interval: 1})
    const [coin,setCoin] = useState({id:"bitcoin", symbol: "btc",current_price: "0.0000000"})
    
    useEffect(()=> dispatch({type: "Day"}), []);

    const fetchCoin = async () => {
        return await fetch(
            `https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart?vs_currency=usd&days=364&interval=30`)
            .then((res) => {
            if(!res.ok) {
                throw new Error("Failed to load data")
            }
            return res.json()
        })
    }


    const { data, isLoading, isError } = useQuery(["bigGraph", timeLapse?.interval, coin],fetchCoin)
    
    const handleClick = e => {
        let lapse = e.target.innerText
        dispatch({ type : lapse })
    }



    if(isError) return <div>Error loading graph</div>

    if(isLoading) return <div className={style.container}><Loader /></div>

    
    const { prices } = data

    
    const pricesDaily = prices.filter((price,i) => {
        if(i % timeLapse.interval === 0){

        return price
        }

    })


    
    
    return(
        <div className={style.container}>
            <div className={style.selectors}>
                <div className={style.timeLapse} onClick={handleClick}>
                    <button className={timeLapse?.interval === 1 ? style.active : ""}>Day</button>
                    <button className={timeLapse?.interval === 7  ? style.active : ""}>Week</button>
                    <button className={timeLapse?.interval === 30  ? style.active : ""}>Month</button>
                </div>
                <Selector showPrice={false} coin={coin} setCoin={setCoin} />
            </div>
            <div className={style.chartContainer}>
                <MainChart prices={pricesDaily} timeLapse={timeLapse} />
            </div>
        </div>
        )
}