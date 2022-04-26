import React from "react";
import { useKey, useCavasManager, useMouse } from "./customHooks";

function App() {
  useKey();
  useMouse();
  const containerId = useCavasManager();
  return (
    <div
      style={{
        width: "90vw",
        height: "90vh",
        border: "solid 5px red",
        marginLeft: "5vw",
        marginTop: "5vh",
      }}
      id={containerId}
    />
  );
}

export default App;
