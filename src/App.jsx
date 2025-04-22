import React, { useState } from "react";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    try {
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      const currentData = await currentRes.json();
      const forecastData = await forecastRes.json();

      if (currentData.cod === 200 && forecastData.cod === "200") {
        setWeather(currentData);
        const dailyForecasts = forecastData.list.filter(
          (_, idx) => idx % 8 === 0
        );
        setForecast(dailyForecasts);
        setError(null);
      } else {
        throw new Error("City not found");
      }
    } catch (err) {
      console.error(err);
      setError("Could not fetch weather data");
      setWeather(null);
      setForecast([]);
    }
  };

  const fetchByLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const currentRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );

          const currentData = await currentRes.json();
          const forecastData = await forecastRes.json();

          if (currentData.cod === 200 && forecastData.cod === "200") {
            setWeather(currentData);
            const dailyForecasts = forecastData.list.filter(
              (_, idx) => idx % 8 === 0
            );
            setForecast(dailyForecasts);
            setError(null);
          } else {
            throw new Error("Failed to load location data");
          }
        } catch (err) {
          console.error(err);
          setError("Error fetching weather by location");
          setWeather(null);
          setForecast([]);
        }
      },
      () => {
        setError("Permission denied or unavailable");
      }
    );
  };

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">Weather App</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-4 py-2 border rounded-md outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      <button
        onClick={fetchByLocation}
        className="w-full mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
      >
        Use My Location
      </button>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {weather && (
        <div className="bg-blue-100 p-4 rounded-md mb-6 flex items-center gap-4">
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <div className="text-left">
            <p className="text-xl font-semibold">{weather.name}</p>
            <p>{Math.round(weather.main.temp)}°C</p>
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}

      {forecast.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold mb-2">5-Day Forecast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {forecast.map((day, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-md shadow text-center"
              >
                <p className="font-semibold mb-1">
                  {new Date(day.dt_txt).toLocaleDateString(undefined, {
                    weekday: "long",
                  })}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt={day.weather[0].description}
                  className="mx-auto"
                />
                <p>{Math.round(day.main.temp)}°C</p>
                <p className="capitalize">{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
