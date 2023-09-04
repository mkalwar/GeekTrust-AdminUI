import React from "react";
import { Typography, Box } from "@mui/material";
import "./AppBar.css";

const AppBar = () => {
  return (
    <div>
      <Box className="header">
        <Typography className="header-title">Administrator-Panel</Typography>
      </Box>
    </div>
  );
};

export default AppBar;
