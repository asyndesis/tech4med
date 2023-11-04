import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

type CombinedLinkProps = MuiLinkProps & NextLinkProps;

export default function Link(props: CombinedLinkProps) {
  return <MuiLink component={NextLink} {...props} />;
}
