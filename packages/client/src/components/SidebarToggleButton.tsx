"use client";
import { IconButton } from "@mui/material";
import { useAppContext } from "./AppContextProvider";
import { Menu } from "@mui/icons-material";

export default function SidebarToggleButton() {
  const { setSidebarOpen } = useAppContext();
  return (
    <IconButton
      sx={{ display: ["block", "none", "none"] }}
      onClick={() => setSidebarOpen((prev) => !prev)}
    >
      <Menu />
    </IconButton>
  );
}
