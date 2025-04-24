// src/utils/getBackgroundClass.js
export default function getBackgroundClass(weather) {
  switch (weather) {
    case "Clear":
      return "bg-gradient-to-b from-yellow-300 to-yellow-500";
    case "Clouds":
      return "bg-gradient-to-b from-gray-400 to-gray-600";
    case "Rain":
      return "bg-gradient-to-b from-blue-400 to-blue-600";
    case "Snow":
      return "bg-gradient-to-b from-white to-blue-200";
    case "Thunderstorm":
      return "bg-gradient-to-b from-purple-700 to-gray-900";
    case "Drizzle":
      return "bg-gradient-to-b from-blue-300 to-blue-500";
    case "Mist":
    case "Fog":
      return "bg-gradient-to-b from-gray-300 to-gray-500";
    default:
      return "bg-gradient-to-b from-blue-200 to-blue-400";
  }
}
