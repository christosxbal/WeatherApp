import React from "react";

const ForecastList = ({ forecast, onSelectDay }) => {
  if (!forecast?.length) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-6">
      {forecast.map((day, index) => {
        const icon = day.weather[0].icon;
        const date = new Date(day.dt_txt);
        const label = date.toLocaleDateString("en-US", { weekday: "short" });

        return (
          <div
            key={index}
            onClick={() => onSelectDay(date.toDateString())}
            className="cursor-pointer bg-white rounded-lg p-4 text-center shadow hover:scale-105 transition"
          >
            <p className="font-semibold">{label}</p>
            <img
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt={day.weather[0].description}
              className="mx-auto"
            />
            <p>{Math.round(day.main.temp)}°C</p>
          </div>
        );
      })}
    </div>
  );
};

export default ForecastList;
