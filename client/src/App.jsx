import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { TermsPage } from "./pages/terms";
import ViewsPage from "./pages/views";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <TermsPage />,
      },
      {
        path: "views",
        element: <ViewsPage />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
