import { Chapter17 } from "../../chapters";
import { CanvasManager } from "../../utils";
import { PayloadAction } from "@reduxjs/toolkit";
import { Press, Special } from "../../types";
import { takeEvery } from "redux-saga/effects";
import { press } from "../../reducers";

export function* chapter17Saga(controller: CanvasManager) {
  const chapter17 = new Chapter17();
  controller.add(chapter17.scene);
  controller.requestAnimation(chapter17.updateOnAnimationFrame);
  yield takeEvery(press.type, chapter17CommandsSaga(chapter17));
}

function chapter17CommandsSaga(chapter17: Chapter17) {
  return function ({ payload }: PayloadAction<Press>) {
    switch (payload) {
      case Special.Space:
        chapter17.changeLayer();
        break;
      default:
    }
  };
}
