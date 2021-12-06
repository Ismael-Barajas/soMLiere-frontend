import "../styles/globals.css";
import React from "react";
import { ColorModeContextProvider } from "../context/ColorModeContext";
import { NavBar } from "../components";
import { Box } from "@mui/system";

function MyApp({ Component, pageProps }) {
  return (
    <ColorModeContextProvider>
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "background.default",
        }}
      >
        <NavBar />
        <Component {...pageProps} />
      </Box>
    </ColorModeContextProvider>
  );
}

export default MyApp;
