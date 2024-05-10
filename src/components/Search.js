import React from "react";

function Search({ search, setSearch }) {
  // Function to handle search input changes
  function handleSearch(event) {
    setSearch(event.target.value);
  }

  return (
    <div className="ui large fluid icon input">
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        value={search}
        onChange={handleSearch} // Call handleSearch function on change
      />
      {/* Search icon */}
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;

