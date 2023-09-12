import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export const Animation = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: '0',
        left: '0',
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        background: "rgba(0, 0, 0, .1)",
        height: "100%",
        width: '100%',
      }}
    >
      <CircularProgress/>
    </Box>
  );
};
