import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";

const COLOR_ICON_SELECTED = "primary.main";

export default function SidebarNavItem({ icon, selected, href, children, ...props }: any) {
  return (
    <ListItemButton
      component={Link}
      href={href}
      selected={selected}
      sx={{
        zIndex: 100,
        "&:hover": {
          bgcolor: "primary.lighter",
        },
        "&.Mui-selected": {
          bgcolor: "primary.lighter",
          borderRight: (theme) => `2px solid ${theme.palette.primary.main}`,
          color: COLOR_ICON_SELECTED,
          "&:hover": {
            color: COLOR_ICON_SELECTED,
            bgcolor: "primary.lighter",
          },
        },
      }}
      {...props}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={children} />
    </ListItemButton>
  );
}
