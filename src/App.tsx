import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "./config/Theme";
import Layout from "./components/Layout";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./views/Login";

function App() {
  const Auth0 = useAuth0();
  return (
    <ThemeProvider theme={Theme}>
      {Auth0.isAuthenticated ? 
        <Layout />
      :
        <Login />
      }
    </ThemeProvider>
  );
}

export default App;
