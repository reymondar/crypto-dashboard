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
  price: number[];
};

export const LineChart = ({ price }: graphProps) => {
  ChartJS.register(
    CategoryScale,
    PointElement,
    LineElement,
    LinearScale,
    Tooltip,
    Filler
  );

  //Falta una funcion para que los dias esten dinamicamente
  const labels = [1, 2, 3, 4, 5, 6, 7];
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
          gradient.addColorStop(0, "rgba(250,174,50,1)");
          gradient.addColorStop(1, "rgba(250,174,50,0)");
          return gradient;
        },
        borderColor: "rgb(255,170,102)",
        tension: 0.4,
        spanGaps: true,
      },
    ],
  };

  const options = {
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
