"use client"; // This is a client component
import { Box, List } from "@mui/material";
import FileDbIcon from "@mui/icons-material/InsertDriveFile";
import SidebarNavItem from "@/components/SidebarNavItem";
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
        <SidebarNavItem
          href={"/"}
          icon={<Home />}
          selected={isHomeSelected}
          onClick={() => {
            setSidebarOpen(false);
          }}
        >
          Home
        </SidebarNavItem>
        <SidebarNavItem
          href={"/project"}
          icon={<FileDbIcon />}
          selected={isProjectsSelected}
          onClick={() => {
            setSidebarOpen(false);
          }}
        >
          Projects
        </SidebarNavItem>
      </List>
      <Box sx={{ flex: 1 }} />
    </Box>
  );
}
