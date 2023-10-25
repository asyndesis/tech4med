import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ColorModeProvider from "./components/ColorModeContext";
import { CssBaseline } from "@mui/material";
import AppThemeProvider from "./components/AppThemeProvider";

import RootPage from "./routes/root";
import ErrorPage from "./routes/error";
import BodyPage from "./routes/body";
import LandingPage from "./routes/landing";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "mongo",
        element: <BodyPage />,
      },
      {
        path: "file",
        element: <BodyPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <ColorModeProvider>
      <AppThemeProvider>
        <CssBaseline />
        <RouterProvider router={router} />
      </AppThemeProvider>
    </ColorModeProvider>
  );
}
