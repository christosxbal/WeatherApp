import React from "react";

const HourlyForecast = ({ forecast, selectedDate }) => {
  if (!forecast?.length || !selectedDate) return null;

  const filtered = forecast.filter(
    (item) => new Date(item.dt_txt).toDateString() === selectedDate
  );

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow w-full max-w-4xl">
      <h2 className="text-xl font-bold mb-4 text-center">{selectedDate}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        {filtered.map((item, index) => {
          const time = new Date(item.dt_txt).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const icon = item.weather[0].icon;
          return (
            <div key={index} className="p-2 border rounded-lg">
              <p>{time}</p>
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={item.weather[0].description}
                className="mx-auto"
              />
              <p>{Math.round(item.main.temp)}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyForecast;
