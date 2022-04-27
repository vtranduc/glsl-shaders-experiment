import { all, takeLatest, select, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { CanvasManager } from "../../utils";
import { Chapter5 } from "../../chapters";
import { RootState, XY, Press, Arrow } from "../../types";
import { setCanvasDimensions } from "../../reducers/canvasReducer";
import { press } from "../../reducers";

export function* chapter5Saga(controller: CanvasManager) {
  const chapter5 = new Chapter5();
  const resolutionUpdater = updateResolution(chapter5);
  yield resolutionUpdater();
  controller.add(chapter5.scene);
  yield all([
    takeLatest(setCanvasDimensions.type, resolutionUpdater),
    takeEvery(press.type, chapter5CommandsSaga(chapter5)),
  ]);
}

function updateResolution(chapter5: Chapter5) {
  return function* () {
    const resolution: XY | null = yield select((state: RootState) => {
      if (!state.canvas.dimensions) return null;
      const { width, height } = state.canvas.dimensions;
      return { x: width, y: height };
    });
    if (resolution) chapter5.updateResolution(resolution);
  };
}

function chapter5CommandsSaga(chapter5: Chapter5) {
  return function ({ payload }: PayloadAction<Press>) {
    switch (payload) {
      case Arrow.Up:
        chapter5.size++;
        break;
      case Arrow.Down:
        chapter5.size--;
        break;
      default:
    }
  };
}
