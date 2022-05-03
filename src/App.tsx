import React from "react";
import { useKey, useCavasManager, useMouse } from "./customHooks";
import { DragAndDrop } from "./components";

function App() {
  useKey();
  useMouse();
  const containerId = useCavasManager();
  return (
    <DragAndDrop
      style={{
        width: "90vw",
        height: "90vh",
        border: "solid 5px red",
        marginLeft: "5vw",
        marginTop: "5vh",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
        }}
        id={containerId}
      />
    </DragAndDrop>
  );
}

export default App;
