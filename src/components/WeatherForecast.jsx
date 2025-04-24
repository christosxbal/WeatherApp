import React from "react";
import dayjs from "dayjs";

const WeatherForecast = ({ data, onDaySelect }) => {
  if (!data || !data.list) return null;

  const dailyMap = {};

  data.list.forEach((item) => {
    const day = dayjs(item.dt_txt).format("YYYY-MM-DD");
    if (!dailyMap[day]) dailyMap[day] = [];
    dailyMap[day].push(item);
  });

  const dailySummaries = Object.entries(dailyMap).map(([date, entries]) => {
    const mid = entries[Math.floor(entries.length / 2)];
    return { date, summary: mid };
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      {dailySummaries.map(({ date, summary }) => (
        <div
          key={date}
          onClick={() => onDaySelect(dailyMap[date])}
          className="bg-white shadow-lg bg-opacity-20 p-4 rounded-lg cursor-pointer hover:bg-opacity-30"
        >
          <p className="font-bold">{dayjs(date).format("dddd")}</p>
          <p>{Math.round(summary.main.temp)}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${summary.weather[0].icon}@2x.png`}
            alt="icon"
            className="w-18 h-18 mx-auto  "
          />
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;
