import React from "react";
import { Typography, Stack } from "@mui/material";
import TopBar from "@/components/TopBar";

export default function Page({ params }: any) {
  return (
    <>
      <TopBar>Home</TopBar>
      <Stack sx={{ py: 12, alignItems: "center", gap: 4 }}>
        <Typography color="textPrimary" sx={{ fontSize: [22, 32, 44] }}>
          Projects Browser
        </Typography>
        {/* eslint-disable-next-line */}
        <img src="/images/home.svg" style={{ maxWidth: "50%" }} />
      </Stack>
    </>
  );
}
