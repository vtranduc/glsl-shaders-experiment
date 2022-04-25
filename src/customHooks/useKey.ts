import { useMemo, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { press, release } from "../reducers";
import { Key, Arrow, Special, Press } from "../types";

export function useKey() {
  const dispatch = useDispatch();
  const presses = useMemo(
    () =>
      (Object.values(Key) as Press[])
        .concat(Object.values(Arrow))
        .concat(Object.values(Special)),
    []
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!(presses as string[]).includes(e.code)) return;
      e.preventDefault();
      dispatch(press(e.code as Press));
    },
    [presses, dispatch]
  );

  const handleKeyUp = useCallback(
    (e: KeyboardEvent) => {
      if (!(presses as string[]).includes(e.code)) return;
      e.preventDefault();
      dispatch(release(e.code as Press));
    },
    [presses, dispatch]
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
