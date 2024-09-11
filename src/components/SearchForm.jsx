import { Box, Button, TextField } from "@mui/material";
import React from "react";

export const SearchForm = ({ inputValue, handleInputChange, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <TextField
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          label="Wpisz miasto"
        />
        <Button type="submit" variant="contained">
          Szukaj
        </Button>
      </Box>
    </form>
  );
};
