"use client";
import { AppBar, Box, Toolbar } from "@mui/material";
import { ReactNode } from "react";
import ColorToggleButton from "@/components/ColorToggleButton";
import SidebarToggleButton from "@/components/SidebarToggleButton";
import BackButton from "@/components/BackButton";

export default function TopBar({ children }: { children: ReactNode }) {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        borderBottom: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <SidebarToggleButton />
        <BackButton />
        <Box sx={{ flex: 1 }}>{children}</Box>
        <ColorToggleButton />
      </Toolbar>
    </AppBar>
  );
}
