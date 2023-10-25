import React, { createContext, useContext, useState, ReactNode } from "react";

export type ColorMode = "dark" | "light";

interface ColorModeContextType {
  colorMode: ColorMode;
  setColorMode: React.Dispatch<React.SetStateAction<ColorMode>>;
}

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

const ColorModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const defaultColor: ColorMode = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const [colorMode, setColorMode] = useState<ColorMode>(defaultColor);
  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      {children}
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
