import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { press, release } from "../reducers";
import { Press, presses } from "../types";

export function useKey() {
  const dispatch = useDispatch();
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!(presses as string[]).includes(e.code)) return;
      e.preventDefault();
      dispatch(press(e.code as Press));
    },
    [dispatch]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (!(presses as string[]).includes(e.code)) return;
      e.preventDefault();
      dispatch(release(e.code as Press));
    },
    [dispatch]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyUp, handleKeyDown]);
}
