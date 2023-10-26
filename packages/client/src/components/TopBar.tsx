"use client";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useColorModeContext } from "./ColorModeProvider";
import { ArrowBack, DarkMode, LightMode } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";

export default function TopBar({ children }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { colorMode, setColorMode } = useColorModeContext();
  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const navigateBack = () => {
    const segments = pathname.split("/");
    segments.pop(); // remove the last segment
    router.push(segments.join("/") || "/");
  };

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
        <Button
          variant="contained"
          color="primary"
          disabled={isHome}
          startIcon={<ArrowBack />}
          onClick={() => {
            navigateBack();
          }}
        >
          Back
        </Button>
        <Box sx={{ flex: 1 }}>{children}</Box>
        <IconButton onClick={toggleColorMode}>
          {colorMode === "dark" ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
