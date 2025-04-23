import React, { useEffect, useState } from "react";

const LocationButton = ({ onLocationFound }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLocationClick = () => {
    setLoading(true);
    setError("");

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onLocationFound(latitude, longitude); // Call the parent function with the coordinates
        setLoading(false);
      },
      (error) => {
        setError("Failed to retrieve location. Please try again.");
        setLoading(false);
      }
    );
  };

  return (
    <div className="w-full sm:w-auto">
      <button
        onClick={handleLocationClick}
        className="bg-blue-500 text-white p-2 rounded-md w-full sm:w-auto"
        disabled={loading}
      >
        {loading ? "Locating..." : "Use my location"}
      </button>
      {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
    </div>
  );
};

export default LocationButton;
