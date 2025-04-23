import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import LocationButton from "./components/LocationButton";
import WeatherCard from "./components/WeatherCard";
import WeatherForecast from "./components/WeatherForecast";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchForecastData = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      console.log("Forecast data:", data);
      if (response.ok) {
        setForecastData(data);
      } else {
        setForecastData(null);
        console.error("Forecast error:", data.message);
      }
    } catch (err) {
      console.error("Network error while fetching forecast:", err);
    }
  };

  const handleSearch = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      console.log("Weather data:", data);

      if (response.ok) {
        setWeatherData(data);
        setError(null);
        fetchForecastData(data.coord.lat, data.coord.lon);
      } else {
        setWeatherData(null);
        setForecastData(null);
        setError("City not found. Try again!");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  const handleLocationFound = (lat, lon) => {
    const fetchCurrentAndForecast = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        if (response.ok) {
          setWeatherData(data);
          setError(null);
          fetchForecastData(lat, lon);
        } else {
          setError("Location weather not available.");
        }
      } catch (err) {
        setError("Location fetch error.");
      }
    };

    fetchCurrentAndForecast();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Weather App
      </h1>

      <div className="flex flex-col sm:flex-row gap-2 justify-center mb-6">
        <SearchBar onSearch={handleSearch} />
        <LocationButton onLocation={handleLocationFound} />
      </div>

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {weatherData && <WeatherCard data={weatherData} />}

      {forecastData && <WeatherForecast forecastData={forecastData} />}
    </div>
  );
};

export default App;
