import { useMemo, useState, useContext, createContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { deepPurple, grey, purple } from "@mui/material/colors";
import useMediaQuery from "@mui/material/useMediaQuery";

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
  mode: "light",
});

export const ColorModeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("light");
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  useEffect(() => {
    if (prefersDarkMode) setMode("dark");
    else setMode("light");
  }, [prefersDarkMode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        typography: { fontFamily: ["Open Sans", "sans-serif"].join(",") },
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // palette values for light mode
                primary: deepPurple,
                divider: grey[400],
                background: {
                  default: "#fffaf0",
                  paper: "#fff5e0",
                },
                text: {
                  primary: grey[900],
                  secondary: grey[800],
                },
              }
            : {
                // palette values for dark mode
                primary: purple,
                divider: grey[700],
                background: {
                  default: "#373747",
                  paper: "#373747",
                },
                text: {
                  primary: "#fff",
                  secondary: grey[500],
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => useContext(ColorModeContext);
