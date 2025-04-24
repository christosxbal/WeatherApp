import React from "react";
import HourlyForecastChart from "./ForecastChart";

const HourlyForecast = ({ data }) => {
  return (
    <div className="my-4">
      <h2 className="text-xl font-semibold">Hourly Forecast</h2>
      <div className="flex gap-2 overflow-x-auto">
        {data.map((hour, index) => (
          <div
            key={index}
            className="bg-white text-black p-2 rounded-lg shadow-lg w-20 text-center"
          >
            <p>{new Date(hour.dt_txt).getHours()}h</p>
            <p>{hour.main.temp}°C</p>
          </div>
        ))}
      </div>
      {/* Display the chart */}
      <HourlyForecastChart data={data} />
    </div>
  );
};

export default HourlyForecast;
