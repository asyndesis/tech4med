"use client";
import React from "react";
import { Box } from "@mui/material";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";

const App = ({ children }: any) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopBar />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />
        {children}
      </Box>
    </Box>
  );
};

export default App;
