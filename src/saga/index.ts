import { all } from "redux-saga/effects";
import { canvasSaga } from "./cavasSaga";
import { CanvasManager } from "../utils";
import { chapterSaga } from "./chapters";
import { mouseSaga } from "./mouseSaga";
import { dragAndDropSaga } from "./dragAndDropSaga";

export default function* saga() {
  const controller = new CanvasManager();
  yield all([
    canvasSaga(controller),
    chapterSaga(controller),
    mouseSaga(),
    dragAndDropSaga(),
  ]);
}
