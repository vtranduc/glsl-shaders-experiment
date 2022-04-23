import { useMemo, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pressKey, releaseKey } from "../reducers";
import { RootState, Key } from "../types";

export function useKey() {
  const dispatch = useDispatch();
  const keyPress = useSelector((state: RootState) => state.key);
  const keys = useMemo(() => Object.values(Key), []);
  const getKey = useCallback(
    (e: KeyboardEvent) => {
      e.preventDefault();
      return (keys as string[]).includes(e.code) ? (e.code as Key) : null;
    },
    [keys]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    function handleKeyDown(e: KeyboardEvent) {
      const key = getKey(e);
      if (key) dispatch(pressKey(key));
    }

    function handleKeyUp(e: KeyboardEvent) {
      const key = getKey(e);
      if (key) dispatch(releaseKey(key));
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [getKey, dispatch]);

  return keyPress;
}
