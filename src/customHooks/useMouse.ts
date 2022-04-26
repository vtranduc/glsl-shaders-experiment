import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateMousePosition } from "../reducers";

export function useMouse() {
  const dispatch = useDispatch();

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) =>
      dispatch(updateMousePosition([e.clientX, e.clientY]));
    window.addEventListener("mousemove", onMouseMove, false);
    return () => {
      window.removeEventListener("mousemove", onMouseMove, false);
    };
  }, [dispatch]);
}
