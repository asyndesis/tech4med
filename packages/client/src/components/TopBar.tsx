"use client";
import { AppBar, Box, Breadcrumbs, Switch, Toolbar, Typography } from "@mui/material";
import { useColorModeContext } from "./ColorModeProvider";
import Link from "next/link";

export default function TopBar() {
  const { colorMode, setColorMode } = useColorModeContext();
  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
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
      <Toolbar>
        <Breadcrumbs>
          <Link color="inherit" href="/">
            Home
          </Link>
          <Typography color="textPrimary">Current Page</Typography>
        </Breadcrumbs>
        <Box sx={{ flex: 1 }}></Box>
        <Typography color="textPrimary">Color Mode</Typography>
        <Switch checked={colorMode === "dark"} onChange={toggleColorMode} />
      </Toolbar>
    </AppBar>
  );
}
