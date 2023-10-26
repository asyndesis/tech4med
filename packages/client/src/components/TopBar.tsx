"use client";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useColorModeContext } from "./ColorModeProvider";
import { ArrowBack, DarkMode, LightMode } from "@mui/icons-material";
import { useRouter } from "next/navigation";

export default function TopBar({ children }: any) {
  const router = useRouter();
  const { colorMode, setColorMode } = useColorModeContext();
  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  console.log(router);
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
          startIcon={<ArrowBack />}
          onClick={() => {
            router.back();
          }}
        >
          Back
        </Button>
        <Typography color="textPrimary">{children}</Typography>
        <Box sx={{ flex: 1 }}></Box>
        <IconButton onClick={toggleColorMode}>
          {colorMode === "dark" ? <DarkMode /> : <LightMode />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
