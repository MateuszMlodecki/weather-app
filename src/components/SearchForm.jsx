import React from "react";

const SearchForm = ({ inputValue, handleInputChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Wpisz miasto."
        className="input"
      />
      <button className="button" type="submit">
        Szukaj
      </button>
    </form>
  );
};

export default SearchForm;
