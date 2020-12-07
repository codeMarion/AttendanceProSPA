import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "./config/Theme";
import Layout from "./components/Layout";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./views/Login";
import { UserContextProvider } from "./context/UserContext";

function App() {
  const Auth0 = useAuth0();
  return (
    <UserContextProvider>
      <ThemeProvider theme={Theme}>
        {Auth0.isAuthenticated ? <Layout /> : <Login />}
      </ThemeProvider>
    </UserContextProvider>
  );
}

export default App;
