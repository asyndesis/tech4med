import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

const COLOR_ICON_SELECTED = "primary.main";

export default function NavItem({ icon, href, children }: any) {
  const pathname = usePathname();
  const isSelected = pathname === href;

  return (
    <ListItemButton
      component={Link}
      href={href}
      selected={isSelected}
      sx={{
        zIndex: 1201,
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
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={children} />
    </ListItemButton>
  );
}
