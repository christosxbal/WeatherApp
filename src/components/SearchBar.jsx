import React from "react";

const SearchBar = ({ value, onChange, onSearch }) => {
  return (
    <form onSubmit={onSearch} className="w-full sm:w-auto">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search for a city"
        className="w-full sm:w-64 p-2 border rounded-md"
      />
    </form>
  );
};

export default SearchBar;
