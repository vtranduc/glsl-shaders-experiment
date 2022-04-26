import { all, takeEvery, takeLatest, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { appendToDiv, removeFromDiv, clear, fitToDiv } from "../reducers";
import { CanvasManager } from "../utils";
import { setCanvasDimensions } from "../reducers/canvasReducer";

function appendToDivSaga(controller: CanvasManager) {
  return function* ({ payload }: PayloadAction<string>) {
    const div = document.getElementById(payload);
    if (!(div?.tagName === "DIV")) return;
    controller.appendToDiv(div as HTMLDivElement);
    yield updateDimensions(controller);
  };
}

function removeFromDivSaga(controller: CanvasManager) {
  return function* () {
    controller.removeFromDiv();
    yield updateDimensions(controller);
  };
}

function fitToDivSaga(controller: CanvasManager) {
  return function* () {
    controller.fitToDiv();
    yield updateDimensions(controller);
  };
}

function* updateDimensions(controller: CanvasManager) {
  yield put(setCanvasDimensions(controller.dimensions));
}

function clearSaga(controller: CanvasManager) {
  return () => controller.clear();
}

export function* canvasSaga(controller: CanvasManager) {
  yield all([
    takeEvery(appendToDiv.type, appendToDivSaga(controller)),
    takeEvery(removeFromDiv.type, removeFromDivSaga(controller)),
    takeLatest(fitToDiv.type, fitToDivSaga(controller)),
    takeLatest(clear.type, clearSaga(controller)),
  ]);
}
