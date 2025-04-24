import React, { useState } from "react";

const SearchBar = ({
  onSearch,
  searchQuery,
  setSearchQuery,
  searchHistory,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value !== "") {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearch(searchQuery);
      setShowDropdown(false); // Close dropdown after search
    }
  };

  const handleSearchHistorySelect = (city) => {
    setSearchQuery(city);
    onSearch(city);
    setShowDropdown(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission if using Enter key
      handleSearch();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  // Filter the search history based on the searchQuery
  const filteredHistory = searchHistory.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <input
        type="text"
        value={searchQuery}
        onChange={handleChange}
        onFocus={() => setShowDropdown(true)}
        onKeyDown={handleKeyDown}
        className="p-2 border rounded w-64"
        placeholder="Search for a city"
      />
      <button
        type="submit"
        className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Search
      </button>

      {showDropdown && searchQuery && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded mt-1 shadow-lg">
          {filteredHistory.length > 0 ? (
            filteredHistory.map((city, index) => (
              <li
                key={index}
                onClick={() => handleSearchHistorySelect(city)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {city}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">No matching results</li>
          )}
        </ul>
      )}
    </form>
  );
};

export default SearchBar;
