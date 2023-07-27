import React from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ handleSearch }) =>{
    return(
        <div>
        <TextField 
        fullWidth
        label="search"
        variant="outlined"
        onChange={handleSearch}
        style={{maxWidth: "100%",
              marginTop: "1rem",
              }}/>
            </div>
    );
};
export default SearchBar;