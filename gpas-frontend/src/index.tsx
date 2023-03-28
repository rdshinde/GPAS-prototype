import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { VisualDAuthProvider } from "./context/auth/VisualDAuthProvider";
import env from "react-dotenv";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <VisualDAuthProvider
    publicKey={`0xE112f74b09564c6BD94d1f4e1b71254f881AD641`}
    privateKey={`2c8f002d2cea49b1d02bb2e2cd3c9113f534809a0dc2a1820e33b15b2788eab7`}
    mode={"Development"}
    useWindowWallet={false}
    onErrorHandler={(result) => {
      console.log(result);
    }}
    onSuccessHandler={(result) => {
      console.log(result);
    }}
  >
    <App />
  </VisualDAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
