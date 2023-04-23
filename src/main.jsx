import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React from "react";
import ReactDOM from "react-dom/client";

import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import Signup from "./routes/Signup";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#28A745",
    },
    secondary: {
      main: "#56B6C2",
    },
    error: {
      main: "#F14C4C",
    },
    warning: {
      main: "#F78C6C",
    },
    info: {
      main: "#C8C8C8",
    },
    success: {
      main: "#3E9A58",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#A7A7A7",
    },
    background: {
      paper: "#1E1E1E",
      default: "#111111",
    },
    action: {
      active: "#28A745",
      hover: "#56B6C2",
      selected: "#1E1E1E",
      disabled: "#A7A7A7",
      disabledBackground: "#3B3B3B",
      focus: "#C8C8C8",
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
      <CssBaseline />
    </ThemeProvider>
  </React.StrictMode>
);
