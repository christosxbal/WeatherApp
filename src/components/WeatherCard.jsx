import React from "react";

const WeatherCard = ({ data }) => {
  if (!data) return null; // If no data, render nothing

  const { main, weather, name, sys } = data;

  return (
    <div className="bg-white shadow-lg p-4 rounded-lg">
      <h2 className="text-2xl font-semibold text-center">
        {name}, {sys.country}
      </h2>
      <p className="text-xl text-center">{weather[0]?.description}</p>
      <p className="text-center text-2xl font-bold">{main.temp}°C</p>
      <p className="text-center text-lg">Humidity: {main.humidity}%</p>
    </div>
  );
};

export default WeatherCard;
