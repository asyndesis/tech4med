import React from "react";
import { Button, Container, Typography, Box, Grid } from "@mui/material";

export const LandingPage: React.FC = () => {
  return (
    <Container maxWidth="lg" style={{ paddingTop: "100px", textAlign: "center" }}>
      <Typography variant="h2" gutterBottom color="textPrimary">
        Data Browser
      </Typography>
      <Typography variant="h6" gutterBottom color="textSecondary">
        Choose a version to proceed:
      </Typography>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: "50px" }}
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              // Redirect to MONGO version or handle the logic
              console.log("MONGO version selected");
            }}
          >
            MONGO Version
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            size="large"
            onClick={() => {
              // Redirect to FILEDB version or handle the logic
              console.log("FILEDB version selected");
            }}
          >
            FILEDB Version
          </Button>
        </Grid>
      </Grid>
      <Box mt={6}>
        <Typography variant="body2" color="textSecondary">
          Made with ❤️ using Material-UI
        </Typography>
      </Box>
    </Container>
  );
};

export default LandingPage;
