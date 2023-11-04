"use client";
import { IconButton } from "@mui/material";
import { useColorModeContext } from "./ColorModeProvider";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function ColorToggleButton() {
  const { colorMode, setColorMode } = useColorModeContext();
  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <IconButton onClick={toggleColorMode}>
      {colorMode === "dark" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
}
