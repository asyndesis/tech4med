import Link from "./Link";

export default function CellLink({ sx, ...props }: any) {
  return (
    <Link
      sx={{
        display: "flex",
        alignItems: "center",
        height: "100%",
        width: "100%",
        textDecoration: "none",
        ...sx,
      }}
      {...props}
    />
  );
}
