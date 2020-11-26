import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "./config/Theme";
import Layout from "./components/Layout";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
