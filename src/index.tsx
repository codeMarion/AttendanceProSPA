import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import AuthConfig from "./config/AuthConfig";

ReactDOM.render(
  <Auth0Provider
    domain={AuthConfig.AUTH0_DOMAIN}
    clientId={AuthConfig.AUTH0_CLIENT_ID}
    audience={AuthConfig.AUTH0_AUDIENCE}
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById("root")
);
