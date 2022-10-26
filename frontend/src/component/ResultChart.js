import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function ResultChart({
  selectedQuestionsTypes,
  results,
  length,
}) {
  const options = {
    scales: {
      y: {
        grid: { display: false },
        ticks: {
          color: "whitesmoke",
          beginAtZero: true,
          font: {
            size: "14vh",
          },
        },
      },
      x: {
        ////////
        max: length,
        grid: { color: "white" },
        ticks: {
          color: "whitesmoke",
          beginAtZero: true,
          font: {
            size: "14vh",
          },
        },
      },
    },
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "right",
      },
      title: {
        display: true,
        text: "Resultats",
        color: "white",
        padding: "4px",
        font: {
          size: "15vh",
        },
      },
    },
  };

  /////////
  const labels = selectedQuestionsTypes;



  const data = {
    labels,
    datasets: [
      {
        label: "score",
        //////////
        data: results[0],
        borderWidth: "2",
        borderColor: "rgba(235,235,235)  ",
        backgroundColor: "rgba(35,70,104, 1)",
        //
      },
    ],
  };

  return (
    <div
      className="results-chart-container"
      style={{ width: "42%", minWidth: "330px", margin: "auto auto" }}
    >
      <Bar className="results-chart" options={options} data={data} />
    </div>
  );
}
