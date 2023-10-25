import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  Box,
  CssBaseline,
} from "@mui/material";
import MongoIcon from "@mui/icons-material/Cloud"; // placeholder icon
import FileDbIcon from "@mui/icons-material/InsertDriveFile"; // placeholder icon
import { useColorModeContext } from "../components/ColorModeContext"; // Assuming you've defined ColorModeContext in another file
import { Link, Outlet } from "react-router-dom";

function Sidebar() {
  const { colorMode, setColorMode } = useColorModeContext();

  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" },
        }}
      >
        <List sx={{ flexGrow: 1 }}>
          <ListItem component={Link} to={"/mongo"}>
            <ListItemIcon>
              <MongoIcon />
            </ListItemIcon>
            <ListItemText primary="Mongo" />
          </ListItem>
          <ListItem component={Link} to={"/mongo"}>
            <ListItemIcon>
              <FileDbIcon />
            </ListItemIcon>
            <ListItemText primary="FileDB" />
          </ListItem>
        </List>
        <List>
          <ListItem>
            <ListItemText primary="Dark Mode" />
            <Switch checked={colorMode === "dark"} onChange={toggleColorMode} />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}

export default function Root() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Outlet />
    </Box>
  );
}
