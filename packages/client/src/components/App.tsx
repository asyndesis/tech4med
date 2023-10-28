"use client";
import React from "react";
import { Box, Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = ({ children }: any) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Sidebar />
          <Stack sx={{ width: "100%" }}>{children}</Stack>
        </Box>
      </Box>
    </LocalizationProvider>
  );
};

export default App;
