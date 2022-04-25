import React from "react";
import { useKey, useCavasManager } from "./customHooks";

function App() {
  useKey();
  const containerId = useCavasManager();
  return (
    <div
      style={{
        width: "95vw",
        height: "95vh",
        border: "solid 5px red",
      }}
      id={containerId}
    />
  );
}

export default App;
