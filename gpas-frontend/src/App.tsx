import React, { useEffect } from "react";
import { useUi } from "./context/ui/UiProvider";
import "./styles/App.css";

function App() {
  const { AuthButton } = useUi();
  return (
    <div className="App">
      <AuthButton />
    </div>
  );
}
export default App;
