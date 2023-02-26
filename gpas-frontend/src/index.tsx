import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UiProvider } from "./context/ui/UiProvider";
import { VisualDAuthProvider } from "./context/auth/VisualDAuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <VisualDAuthProvider
    publicKey={"mypublickey"}
    privateKey={"myPrivateKey"}
    mode={"development"}
    useWindowWallet={false}
  >
    <App />
  </VisualDAuthProvider>
  // {/* </React.StrictMode> */}
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

