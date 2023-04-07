import "./App.css";
import { CssBaseline } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { loader as termsLoader, TermsPage } from "./pages/terms";
import ViewsPage, { loader as editLoader } from "./pages/views";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";
import RootLayout from "./layout/RootLayout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,

        errorElement: <div>Something went wrong: try page refresh</div>,
        loader: termsLoader,
        element: <TermsPage />,
      },
      {
        path: "views/user/edit/:userId",
        loader: editLoader,
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
