import React from "react";

const WeatherForecast = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) {
    return <div className="text-center">Forecast data not available.</div>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
      {forecastData.list.slice(0, 5).map((item, index) => (
        <div key={index} className="bg-white p-4 rounded shadow-md text-center">
          <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
          <img
            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
            alt={item.weather[0].description}
            className="mx-auto"
          />
          <p>{item.weather[0].main}</p>
          <p>{Math.round(item.main.temp)}°C</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
