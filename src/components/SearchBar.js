import React from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ value, changeValue }) => {
  return (
    <div>
      <TextField
        fullWidth
        label="Seacrh by name, email or role"
        variant="outlined"
        value={value}
        onChange={(e) => changeValue(e.target.value)}
        style={{ maxWidth: "100%", marginTop: "1rem" }}
      />
    </div>
  );
};
export default SearchBar;
