import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  ScriptableContext,
} from "chart.js";
import { useEffect } from "react";
import { Line } from "react-chartjs-2";
type graphProps = {
  price: number[],
  fullColor: string, 
  halfColor: string
};


const days = ['Monday','Tuesday','Wednesday','Thurdsay','Friday','Saturday','Sunday']

  const reOrderDays = (days: string[]) => {
    
    const today = new Date()
    const todayIndex = today.getDay()

    const elementsToRemove = 7 - todayIndex
    const elementsRemoved = days.splice(todayIndex,elementsToRemove)

    const dateReOrdered = elementsRemoved.concat(days)

    return dateReOrdered
    
  }

  const week = reOrderDays(days)


export const LineChart = ({ price , fullColor , halfColor }: graphProps) => {
  ChartJS.register(
    CategoryScale,
    PointElement,
    LineElement,
    LinearScale,
    Tooltip,
    Filler
  );

  //Falta una funcion para que los dias esten dinamicamente
  const labels = week
  const data = {
    labels,
    datasets: [
      {
        data: price,
        fill: {
          target: "origin",
          boundary: "origin",
        },
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 180);
          gradient.addColorStop(0, fullColor);
          gradient.addColorStop(1, halfColor);
          return gradient;
        },
        borderColor: fullColor,
        tension: 0.4,
        spanGaps: true,
      },
    ],
  };

  const options = {
    elements: {
      point:{
          radius: 1.4
      }
  },
    responsive: true,
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },

      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};
