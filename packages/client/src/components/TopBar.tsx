"use client";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useColorModeContext } from "./ColorModeProvider";
import { ArrowBack, DarkMode, LightMode, Menu } from "@mui/icons-material";
import { usePathname, useRouter } from "next/navigation";
import useQueryParams from "@/hooks/useQueryParams";
import { ReactNode } from "react";
import { useAppContext } from "@/components/AppContextProvider";

export default function TopBar({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { queryString } = useQueryParams();
  const { setSidebarOpen } = useAppContext();

  const { colorMode, setColorMode } = useColorModeContext();
  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const navigateBack = () => {
    const segments = pathname.split("/");
    // remove the last segment from the url
    // I.E: project/1/2/3 -> 3
    segments.pop();
    const baseUrl = segments.join("/") || "/";
    // preserve the querystring. (We use it for filter controls)
    const query = queryString?.length > 0 ? `?${queryString}` : "";
    router.push(baseUrl + query);
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
        <IconButton
          sx={{ display: ["block", "none", "none"] }}
          onClick={() => setSidebarOpen((prev) => !prev)}
        >
          <Menu />
        </IconButton>
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
