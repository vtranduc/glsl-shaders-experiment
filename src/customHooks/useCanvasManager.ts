import { useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  appendToDiv,
  removeFromDiv,
  clear,
  fitToDiv,
  goToChapter,
} from "../reducers";
import { chapters } from "../types";

export function useCavasManager() {
  const dispatch = useDispatch();
  const containerId = useMemo(() => "canvas-container", []);

  useEffect(() => {
    dispatch(appendToDiv(containerId));
    return () => {
      dispatch(clear());
      dispatch(removeFromDiv());
    };
  }, [dispatch, containerId]);

  useEffect(() => {
    const onResize = () => dispatch(fitToDiv());
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(goToChapter(chapters[chapters.length - 1]));
  }, [dispatch]);

  return containerId;
}
