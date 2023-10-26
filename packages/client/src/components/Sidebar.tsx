"use client"; // This is a client component
import { Box, List } from "@mui/material";
import MongoIcon from "@mui/icons-material/Cloud";
import FileDbIcon from "@mui/icons-material/InsertDriveFile";
import NavItem from "@/components/NavItem";

export default function Sidebar() {
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
        <NavItem href={"/mongo"} icon={<MongoIcon />}>
          Mongo
        </NavItem>
        <NavItem href={"/filedb"} icon={<FileDbIcon />}>
          Mongo
        </NavItem>
      </List>
    </Box>
  );
}
