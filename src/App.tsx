import React, { useRef, useMemo, useEffect } from "react";
import { CanvasManager } from "./utils";
import { Chapter1 } from "./chapters";
import { useKey } from "./customHooks";

function App() {
  const canvasManager = useMemo(() => new CanvasManager(), []);
  const canvasContainer = useRef<HTMLDivElement>(null);

  const keyPress = useKey();

  useEffect(() => {
    const div = canvasContainer.current;
    if (!div) return;
    canvasManager.appendToDiv(div);
    const onResize = () => canvasManager.fitToDiv();
    window.addEventListener("resize", onResize);
    return () => {
      canvasManager.clear();
      canvasManager.removeFromDiv();
      window.removeEventListener("resize", onResize);
    };
  }, [canvasManager]);

  const chapter1 = useMemo(() => new Chapter1(), []);

  useEffect(() => {
    canvasManager.add(chapter1.scene);
    return () => {
      canvasManager.remove(chapter1.scene);
    };
  }, [chapter1, canvasManager]);

  useEffect(() => {
    chapter1.onKeyPress(keyPress);
  }, [keyPress, chapter1]);

  return (
    <div
      style={{
        width: "95vw",
        height: "95vh",
        border: "solid 5px red",
      }}
      ref={canvasContainer}
    />
  );
}

export default App;
