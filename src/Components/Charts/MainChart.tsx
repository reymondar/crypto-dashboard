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
  import { Line } from "react-chartjs-2";


  type TimeLapse = {
    days: string[] ,
    interval: number
  }

  type graphProps = {
    prices: string[]
    timeLapse: TimeLapse
  };
  
  export const MainChart = ({ prices, timeLapse  }: graphProps) => {
    ChartJS.register(
      CategoryScale,
      LineElement,
      LinearScale,
      Tooltip,
      Filler
    );
  
    const { days } = timeLapse
    //Falta una funcion para que los dias esten dinamicamente
    const data = {
      labels: days,
      datasets: [
        {
          data: prices,
          fill: {
            target: "origin",
            boundary: "origin",
          },
          backgroundColor: (context: ScriptableContext<"line">) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 250);
            gradient.addColorStop(0, "rgba(0, 150, 255,1)");
            gradient.addColorStop(1, "rgba(0, 150, 255,0)");
            return gradient;
          },
          borderColor: "rgba(0, 150, 255,1)",
          tension: 0.4,
          spanGaps: true,
        },
      ],
    };
  
    const options = {
      elements: {
        point:{
            radius: 0
        }
    },
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
      },
    };
  
    return <Line data={data} options={options} />;
  };
  