import React from "react";

const WeatherCard = ({ weatherData }) => {
  // Check if weatherData exists and has the 'weather' property
  if (!weatherData || !weatherData.weather) {
    return (
      <div className="text-center text-red-500">
        Weather data is not available.
      </div>
    );
  }

  const { main, weather, wind } = weatherData;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center">{weatherData.name}</h2>
      <div className="flex justify-center mt-4">
        <img
          src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
          alt={weather[0].description}
          className="w-16 h-16"
        />
      </div>
      <p className="text-center text-xl">{weather[0].description}</p>
      <p className="text-center text-2xl">{main.temp}°C</p>
      <p className="text-center">{`Humidity: ${main.humidity}%`}</p>
      <p className="text-center">{`Wind: ${wind.speed} m/s`}</p>
    </div>
  );
};

export default WeatherCard;
