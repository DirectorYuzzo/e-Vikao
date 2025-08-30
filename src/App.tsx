import { ChakraProvider, extendTheme, ThemeProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
// import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { router } from "./routes";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
});

function App() {
  return (
    <AuthProvider>
      {/* <ThemeProvider> */}
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
      {/* </ThemeProvider> */}
    </AuthProvider>
  );
}

export default App;
