import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import LocationButton from "./components/LocationButton";
import WeatherCard from "./components/WeatherCard";
import WeatherForecast from "./components/WeatherForecast";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState("");

  // Function to fetch weather data
  const fetchWeatherData = async (city) => {
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY; // Correct way to access environment variable in Vite
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log(data); // Log the response to inspect the data structure

      if (response.ok) {
        // If the response is OK, process the data
        setWeatherData(data);
        setError("");
      } else {
        // If the API returns an error (e.g., city not found)
        setError(data.message || "City not found");
        setWeatherData(null); // Clear previous weather data
      }
    } catch (err) {
      // Handle network or other errors
      setError("Something went wrong while fetching weather data.");
      setWeatherData(null); // Clear previous weather data
    }
  };

  // Function to fetch weather forecast data
  const fetchForecastData = async (lat, lon) => {
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        // If the response is OK, process the data
        setForecastData(data);
      } else {
        // Handle forecast error
        setError("Error fetching forecast data.");
      }
    } catch (err) {
      setError("Something went wrong while fetching forecast data.");
    }
  };

  // Handle search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  // Handle location button click
  const handleLocationFound = (latitude, longitude) => {
    fetchWeatherDataByCoordinates(latitude, longitude);
    fetchForecastData(latitude, longitude);
  };

  // Function to fetch weather data by coordinates (for geolocation)
  const fetchWeatherDataByCoordinates = async (lat, lon) => {
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError("");
      } else {
        setError(data.message || "Error fetching weather data.");
      }
    } catch (err) {
      setError("Something went wrong while fetching weather data.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
        Weather App
      </h1>

      <SearchBar
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onSearch={handleSearch}
      />
      <LocationButton onLocationFound={handleLocationFound} />

      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}

      {weatherData && <WeatherCard weatherData={weatherData} />}

      {forecastData && <WeatherForecast forecastData={forecastData} />}
    </div>
  );
};

export default App;
