import React from "react";

const WeatherCard = ({ data, iconCode }) => {
  return (
    <div className="bg-white text-black p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold">{data.name}</h2>
      <p className="text-lg">{data.weather[0].description}</p>

      {/* Display the weather icon */}
      <div className="flex justify-center">
        <img
          src={`http://openweathermap.org/img/wn/${iconCode}@2x.png`}
          alt={data.weather[0].description}
          className="w-20 h-20"
        />
      </div>

      <p className="text-xl mt-2">{data.main.temp}°C</p>
    </div>
  );
};

export default WeatherCard;
