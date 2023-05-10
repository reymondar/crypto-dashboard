import { MainChart } from "../Charts/MainChart"
import { Selector } from "../Selector/Selector"
import style from "./BigGraph.module.scss"
import React, { useState , useReducer , useEffect } from "react"
import { useQuery } from "react-query"
import { Loader } from "../Loader/Loader"


type State = {
    days: string[],
    interval: number
}

type Actions = 
| {type: "DAY"}
| {type: "WEEK"}
| {type: "MONTH"}


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

const labelReducer = (timeLapse: State, action: Actions ): State => {
    switch(action.type) {
        case "DAY":{
            const timeLapse: State = reduceSetter(1) 
            return timeLapse 
        }
        case "WEEK":{
            const timeLapse: State = reduceSetter(7) 
            return timeLapse
        }
        case "MONTH":{
            const timeLapse: State = reduceSetter(30) 
            return timeLapse
        }  
        default: {
            return timeLapse
        }    
    }
}

const initialState: State = {days: ['1'], interval: 1}

export const BigGraph = () => {
    
    const [timeLapse, dispatch] = useReducer(labelReducer, initialState)
    const [coin,setCoins] = useState({id:"bitcoin", symbol: "btc",current_price: "0.0000000", name:"Bitcoin" , image:""})
    
    useEffect(()=> dispatch({type: "DAY"}), []);

    const { interval } = timeLapse

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


    const { data, isLoading, isError } = useQuery(["bigGraph", interval, coin],fetchCoin)
    
    const handleClick = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLButtonElement
        let lapse = target.name as "DAY" | "WEEK" | "MONTH"
        // lapse is an Actions type property
        dispatch({ type : lapse })
    }



    if(isError) return <div>Error loading graph</div>

    if(isLoading) return <div className={style.container}><Loader /></div>

    
    const { prices } = data

    
    const pricesDaily = prices.filter((price: number,i: number) => {
        if(i % interval === 0){
        return price
        }

    })
 

    return(
        <div className={style.container}>
            <div className={style.selectors}>
                <div className={style.timeLapse} onClick={handleClick}>
                    <button name="DAY" className={interval === 1 ? style.active : ""}>Day</button>
                    <button name="WEEK" className={interval === 7  ? style.active : ""}>Week</button>
                    <button name="MONTH" className={interval === 30  ? style.active : ""}>Month</button>
                </div>
                <Selector showPrice={false} currency={coin} graphCoin={setCoins} />
            </div>
            <div className={style.chartContainer}>
                <MainChart prices={pricesDaily} timeLapse={timeLapse} />
            </div>
        </div>
        )
}