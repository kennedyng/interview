import "./App.css";
import { CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as selectorLoader, TermsPage } from "./pages/terms";
import ViewsPage from "./pages/views";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        errorElement: <div>Something went wrong</div>,
        loader: selectorLoader,
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
