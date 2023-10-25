import { ReactNode } from "react";
import { useColorModeContext } from "./ColorModeContext";
import { createTheme, ThemeProvider } from "@mui/material";

const AppThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { colorMode } = useColorModeContext();

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

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
