import { all, takeEvery, takeLatest } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { appendToDiv, removeFromDiv, clear, fitToDiv } from "../reducers";
import { CanvasManager } from "../utils";

function appendToDivSaga(controller: CanvasManager) {
  return function ({ payload }: PayloadAction<string>) {
    const div = document.getElementById(payload);
    if (div?.tagName === "DIV") controller.appendToDiv(div as HTMLDivElement);
  };
}

function removeFromDivSaga(controller: CanvasManager) {
  return () => controller.removeFromDiv();
}

function fitToDivSaga(controller: CanvasManager) {
  return () => controller.fitToDiv();
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
