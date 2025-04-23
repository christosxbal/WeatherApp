import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import ForecastList from "./components/ForecastList";
import HourlyForecast from "./components/HourlyForecast";

const App = () => {
  const [city, setCity] = useState("Αθήνα");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeatherData = async (cityName) => {
    try {
      setError(null);

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=el&appid=${API_KEY}`
      );
      const weatherData = await weatherRes.json();

      if (weatherData.cod === "404") {
        setError("Η πόλη δεν βρέθηκε. Προσπαθήστε ξανά.");
        setWeather(null);
        setForecast([]);
        setForecastData([]);
        setSelectedDay(null);
        return;
      }

      setWeather(weatherData);

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&lang=el&appid=${API_KEY}`
      );
      const forecastJson = await forecastRes.json();
      const fullList = forecastJson.list;

      const daily = fullList.filter((item) => item.dt_txt.includes("12:00:00"));

      setForecast(daily);
      setForecastData(fullList);
      setSelectedDay(null);
    } catch (err) {
      console.error("Σφάλμα κατά την ανάκτηση δεδομένων:", err);
      setError("Κάτι πήγε στραβά. Δοκιμάστε ξανά.");
    }
  };

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError("Ο περιηγητής σας δεν υποστηρίζει τοποθεσία.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          setError(null);

          const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=el&appid=${API_KEY}`
          );
          const weatherData = await weatherRes.json();
          setWeather(weatherData);

          const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&lang=el&appid=${API_KEY}`
          );
          const forecastJson = await forecastRes.json();
          const fullList = forecastJson.list;

          const daily = fullList.filter((item) =>
            item.dt_txt.includes("12:00:00")
          );

          setForecast(daily);
          setForecastData(fullList);
          setSelectedDay(null);
          setCity(weatherData.name);
        } catch (err) {
          console.error(err);
          setError("Απέτυχε η λήψη τοποθεσίας.");
        }
      },
      (error) => {
        console.error(error);
        setError("Δεν ήταν δυνατή η πρόσβαση στην τοποθεσία.");
      }
    );
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);

  const handleCitySearch = (newCity) => {
    setCity(newCity);
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center p-4">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Καιρός</h1>

      <div className="flex space-x-4 mb-4">
        <SearchBar onSearch={handleCitySearch} />
        <button
          onClick={handleUseMyLocation}
          className="bg-green-500 text-white px-4 py-1 rounded-md shadow hover:bg-green-600"
        >
          Χρήση τοποθεσίας μου
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4">
          {error}
        </div>
      )}

      <WeatherCard weather={weather} />
      <ForecastList forecast={forecast} onSelectDay={setSelectedDay} />
      <HourlyForecast forecast={forecastData} selectedDate={selectedDay} />
    </div>
  );
};

export default App;
