import "../styles/globals.css";
import React from "react";
import { ColorModeContextProvider } from "../context/ColorModeContext";
import { NavBar } from "../components";
import CssBaseline from "@mui/material/CssBaseline";

function MyApp({ Component, pageProps }) {
  return (
    <ColorModeContextProvider>
      <CssBaseline />
      <NavBar />
      <Component {...pageProps} />
    </ColorModeContextProvider>
  );
}

export default MyApp;
