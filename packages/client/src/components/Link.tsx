import { Link as MuiLink } from "@mui/material";
import { default as NextLink } from "next/link";

export default function Link(props: any) {
  return <MuiLink component={NextLink} {...props} />;
}
