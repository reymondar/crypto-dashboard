import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
  } from "chart.js";
  import { Line } from "react-chartjs-2";
  type graphProps = {
    prices: string[]
    timeLapse: string[]
  };
  
  export const MainChart = ({ prices, timeLapse  }: graphProps) => {
    ChartJS.register(
      CategoryScale,
      PointElement,
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
            gradient.addColorStop(0, "rgba(75,192,192,1)");
            gradient.addColorStop(1, "rgba(75,192,192,0)");
            return gradient;
          },
          borderColor: "rgba(75,192,192,1)",
          tension: 0.4,
          spanGaps: true,
        },
      ],
    };
  
    const options = {
      responsive: true,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
  
        y: {
          grid: {
            //NOT WORKING RN
            borderDash: [8,8],
          }
        },
      },
    };
  
    return <Line data={data} options={options} />;
  };
  