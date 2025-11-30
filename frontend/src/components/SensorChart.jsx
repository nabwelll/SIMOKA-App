import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function SensorChart({ title, data }) {
  const chartData = {
    labels: data.map((_, i) => i + 1),
    datasets: [
      {
        label: title,
        data: data,
        borderWidth: 2,
        tension: 0.4,
      },
    ],
  };

  return <Line data={chartData} />;
}
