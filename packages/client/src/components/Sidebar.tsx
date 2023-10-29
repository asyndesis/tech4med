"use client"; // This is a client component
import { Box, List } from "@mui/material";
import FileDbIcon from "@mui/icons-material/InsertDriveFile";
import NavItem from "@/components/NavItem";
import { usePathname } from "next/navigation";
import { Home } from "@mui/icons-material";
import { useAppContext } from "./AppContextProvider";

export default function Sidebar() {
  const pathname = usePathname();
  const isProjectsSelected = pathname?.includes("/project");
  const isHomeSelected = pathname === "/";
  const { sidebarOpen, setSidebarOpen } = useAppContext();

  return (
    <Box
      sx={{
        backgroundColor: (t) => t.palette.background.default,
        flexDirection: "column",
        zIndex: 100,
        position: ["fixed", "static", "static"],
        minWidth: ["100%", 240, 240],
        minHeight: "100%",
        display: [sidebarOpen ? "flex" : "none", "flex", "flex"],
        borderRight: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <List sx={{ flexGrow: 1 }}>
        <NavItem
          href={"/"}
          icon={<Home />}
          selected={isHomeSelected}
          onClick={() => {
            setSidebarOpen(false);
          }}
        >
          Home
        </NavItem>
        <NavItem
          href={"/project"}
          icon={<FileDbIcon />}
          selected={isProjectsSelected}
          onClick={() => {
            setSidebarOpen(false);
          }}
        >
          Projects
        </NavItem>
      </List>
      <Box sx={{ flex: 1 }} />
    </Box>
  );
}
