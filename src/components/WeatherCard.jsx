import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const { name, main, weather: details } = weather;
  const icon = details[0].icon;
  const description = details[0].description;

  return (
    <div className="bg-white shadow-md rounded-xl p-6 text-center">
      <h2 className="text-2xl font-bold">{name}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={description}
        className="mx-auto"
      />
      <p className="text-lg capitalize">{description}</p>
      <p className="text-4xl font-bold">{Math.round(main.temp)}°C</p>
    </div>
  );
};

export default WeatherCard;
