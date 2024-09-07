import React from "react";

const SearchForm = ({ inputValue, handleInputChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Wpisz miasto"
          className="input"
        />
        <button className="button" type="submit">
          Szukaj
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
