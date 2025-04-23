import React from "react";

const LocationButton = ({ onLocation }) => {
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onLocation(latitude, longitude); // Call the parent function with the coordinates
        },
        (error) => {
          console.error("Error getting location", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <button
      onClick={handleLocationClick}
      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
    >
      Use my location
    </button>
  );
};

export default LocationButton;
