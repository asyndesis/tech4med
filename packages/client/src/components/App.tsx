"use client";
import React from "react";
import { Box, Stack } from "@mui/material";
import Sidebar from "./Sidebar";

const App = ({ children }: any) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />
        <Stack sx={{ width: "100%" }}>{children}</Stack>
      </Box>
    </Box>
  );
};

export default App;
