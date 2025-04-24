import React from "react";
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

// Registering the necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const HourlyForecastChart = ({ data }) => {
  // Prepare data for the chart
  const chartData = {
    labels: data.map((hour) => hour.dt_txt), // Hour labels (e.g., 12:00, 13:00, etc.)
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.map((hour) => hour.main.temp),
        fill: false,
        borderColor: "#42A5F5", // Line color
        tension: 0.1, // Line smoothing
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Hourly Temperature Forecast",
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hour",
        },
      },
      y: {
        title: {
          display: true,
          text: "Temperature (°C)",
        },
        min: -10, // Adjust the Y axis range as needed
        max: 40, // Adjust the Y axis range as needed
      },
    },
  };

  return (
    <div className="my-4">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default HourlyForecastChart;
