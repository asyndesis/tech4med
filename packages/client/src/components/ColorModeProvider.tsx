"use client";
import { ThemeProvider, createTheme } from "@mui/material";
import React, { createContext, useContext, useState, ReactNode } from "react";

export type ColorMode = "dark" | "light";

interface ColorModeContextType {
  colorMode: ColorMode;
  setColorMode: React.Dispatch<React.SetStateAction<ColorMode>>;
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

const ColorModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const defaultColor: ColorMode = "light";
  const [colorMode, setColorMode] = useState<ColorMode>(defaultColor);
  const baseTheme = createTheme({
    palette: {
      mode: colorMode,
    },
  });

  const theme = createTheme({
    ...baseTheme,
    components: {
      MuiListItem: {
        styleOverrides: {
          root: {
            color: baseTheme.palette.primary.main, // accessing the color from the baseTheme
            textDecoration: "none",
          },
        },
      },
    },
  });

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorModeContext = (): ColorModeContextType => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error("useColorMode must be used within a ColorModeProvider");
  }
  return context;
};

export default ColorModeProvider;
