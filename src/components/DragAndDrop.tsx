import { DragEvent, useCallback } from "react";
import { RootState, ContainerProps } from "../types";
import { useSelector, useDispatch } from "react-redux";
import { getEXT } from "../utils";
import { dropFile, updateMousePosition } from "../reducers";

type DragAndDropEvent = DragEvent<HTMLDivElement>;

export function DragAndDrop({ children, style }: ContainerProps) {
  const dispatch = useDispatch();
  const enabled = useSelector((state: RootState) => state.dragAndDrop.enabled);

  const preventDefaultAndStopPrograpagation = useCallback(
    (e: DragAndDropEvent) => {
      e.preventDefault();
      e.stopPropagation();
    },
    []
  );

  const handleDrop = useCallback(
    (e: DragAndDropEvent) => {
      preventDefaultAndStopPrograpagation(e);
      const file = e.dataTransfer.files[0];
      const ext = getEXT(file.name);
      if (!ext) return;
      dispatch(updateMousePosition([e.clientX, e.clientY]));
      const blob = window.URL.createObjectURL(file);
      dispatch(dropFile({ blob, ext }));
    },
    [preventDefaultAndStopPrograpagation, dispatch]
  );

  return (
    <div
      style={style}
      onDrop={enabled ? handleDrop : undefined}
      onDragOver={enabled ? preventDefaultAndStopPrograpagation : undefined}
      onDragEnter={enabled ? preventDefaultAndStopPrograpagation : undefined}
      onDragLeave={enabled ? preventDefaultAndStopPrograpagation : undefined}
      children={children}
    />
  );
}
