import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import LocationButton from "./components/LocationButton";
import WeatherCard from "./components/WeatherCard";
import WeatherForecast from "./components/WeatherForecast";
import HourlyForecast from "./components/HourlyForecast";

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDayData, setSelectedDayData] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  // Load search history from localStorage on initial load
  useEffect(() => {
    const savedHistory =
      JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(savedHistory);
  }, []);

  const saveSearchHistory = (city) => {
    // Add city to search history if it's not already there
    const updatedHistory = [
      city,
      ...searchHistory.filter((item) => item !== city),
    ];
    setSearchHistory(updatedHistory);
    localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
  };

  const fetchForecastData = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (response.ok && data.list) {
        setForecastData(data);
      } else {
        setForecastData(null);
        console.error("Forecast error:", data.message);
      }
    } catch (err) {
      setForecastData(null);
    }
  };

  const handleSearch = async (city) => {
    setSearchQuery(city); // Update the search query to the city
    setSelectedDayData([]); // Reset the hourly forecast data

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setError(null);
        saveSearchHistory(city); // Save to history
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
    <div className="min-h-screen bg-amber-50 text-black p-4">
      <div className="max-w-xl mx-auto space-y-4">
        <h1 className="text-3xl font-bold text-center">Weather App</h1>
        <div className="flex gap-2 justify-center relative">
          <SearchBar
            onSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            searchHistory={searchHistory}
          />
          <LocationButton onLocation={handleLocationFound} />
        </div>

        {error && <div className="text-red-500 text-center">{error}</div>}

        {weatherData && (
          <WeatherCard
            data={weatherData}
            iconCode={weatherData.weather[0].icon}
          />
        )}

        <WeatherForecast data={forecastData} onDaySelect={setSelectedDayData} />
        {/* Reset the HourlyForecast if no day is selected */}
        {selectedDayData.length > 0 && (
          <>
            <HourlyForecast data={selectedDayData} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
