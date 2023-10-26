"use client"; // This is a client component
import { Box, List, Typography } from "@mui/material";
import FileDbIcon from "@mui/icons-material/InsertDriveFile";
import NavItem from "@/components/NavItem";
import { usePathname } from "next/navigation";
import { Home } from "@mui/icons-material";

export default function Sidebar() {
  const pathname = usePathname();
  const isProjectsSelected = pathname?.includes("/project");
  const isHomeSelected = pathname === "/";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minWidth: 240,
        borderRight: (t) => `1px solid ${t.palette.divider}`,
      }}
    >
      <List sx={{ flexGrow: 1 }}>
        <NavItem href={"/"} icon={<Home />} selected={isHomeSelected}>
          Home
        </NavItem>
        <NavItem href={"/project"} icon={<FileDbIcon />} selected={isProjectsSelected}>
          Projects
        </NavItem>
      </List>
      <Box sx={{ flex: 1 }} />
    </Box>
  );
}
