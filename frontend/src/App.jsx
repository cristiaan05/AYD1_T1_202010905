import React from "react";
import AppRoutes from "./routes/AppRoutes";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { AuthProvider } from "./components/AuthContext";
import Navbar from "./components/Navbar";

function App() {
  const theme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#4B79A1",
        dark: "#283E51",
      },
      secondary: {
        main: "#F4D35E",
        dark: "#EE964B",
      },
      background: {
        default: "#F8F9FA",
      },
      paper: {
        default: "#FFFFFF",
      },
    }
  });

  return (
      <AuthProvider>
        {/* <Navbar /> */}
        <AppRoutes />
      </AuthProvider>
  );
}

export default App;