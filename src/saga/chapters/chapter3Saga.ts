import { all, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { CanvasManager } from "../../utils";
import { Chapter3 } from "../../chapters";
import { MousePosition } from "../../types";
import { setMousePosition } from "../../reducers/mouseReducer";

export function* chapter3Saga(controller: CanvasManager) {
  const chapter3 = new Chapter3();
  controller.add(chapter3.scene);
  yield all([
    takeLatest(
      setMousePosition.type,
      chapter3CommandsSaga(chapter3, controller)
    ),
  ]);
}

function chapter3CommandsSaga(chapter3: Chapter3, controller: CanvasManager) {
  return function ({ payload }: PayloadAction<MousePosition>) {
    const intersect = controller.intersectObject(chapter3.scene, payload)[0];
    if (!intersect) return;
    chapter3.changeColorByIntersection(intersect.point);
  };
}
