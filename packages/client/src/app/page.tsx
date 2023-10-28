import React from "react";
import { Typography, Stack } from "@mui/material";
import TopBar from "@/components/TopBar";

export default function Page({ params }: any) {
  return (
    <>
      <TopBar>Home</TopBar>
      <Stack sx={{ py: 12, alignItems: "center" }}>
        <Typography variant="h2" gutterBottom color="textPrimary">
          Projects Browser v1
        </Typography>
        <img src="/images/home.svg" style={{ maxWidth: "50%" }} />
      </Stack>
    </>
  );
}
