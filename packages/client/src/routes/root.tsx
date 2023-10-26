import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Box,
  AppBar,
  Toolbar,
  Breadcrumbs,
  Typography,
} from "@mui/material";
import MongoIcon from "@mui/icons-material/Cloud";
import FileDbIcon from "@mui/icons-material/InsertDriveFile";

import { useColorModeContext } from "../components/ColorModeContext";
import { Link, Outlet } from "react-router-dom";

function Sidebar() {
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
        <ListItem button component={Link} to={"/mongo"}>
          <ListItemIcon>
            <MongoIcon />
          </ListItemIcon>
          <ListItemText primary="Mongo" />
        </ListItem>
        <ListItem button component={Link} to={"/filedb"}>
          <ListItemIcon>
            <FileDbIcon />
          </ListItemIcon>
          <ListItemText primary="FileDB" />
        </ListItem>
      </List>
    </Box>
  );
}

export default function Root() {
  const { colorMode, setColorMode } = useColorModeContext();
  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
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
            <Link color="inherit" to="/">
              Home
            </Link>
            <Typography color="textPrimary">Current Page</Typography>
          </Breadcrumbs>
          <Box sx={{ flex: 1 }}></Box>
          <Typography color="textPrimary">Color Mode</Typography>
          <Switch checked={colorMode === "dark"} onChange={toggleColorMode} />
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar />
        <Outlet />
      </Box>
    </Box>
  );
}
