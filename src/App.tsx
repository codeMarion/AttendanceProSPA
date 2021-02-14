import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "./config/Theme";
import Layout from "./components/Layout";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./views/Login";
import { UserContextProvider } from "./context/UserContext";
import { UploadContextProvider } from "./context/UploadContext";
import { SnackbarProvider } from "notistack";
import { AppContextProvider } from "./context/AppContext";
import { CourseContextProvider } from "./context/CourseContext";

function App() {
  const Auth0 = useAuth0();
  return (
    <UserContextProvider>
      <UploadContextProvider>
        <AppContextProvider>
          <CourseContextProvider>
            <ThemeProvider theme={Theme}>
              <SnackbarProvider>
                {Auth0.isAuthenticated ? <Layout /> : <Login />}
              </SnackbarProvider>
            </ThemeProvider>
          </CourseContextProvider>
        </AppContextProvider>
      </UploadContextProvider>
    </UserContextProvider>
  );
}

export default App;
