import { Chapter16 } from "../../chapters";
import { CanvasManager } from "../../utils";
import { takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { Press, Special, Arrow } from "../../types";
import { press } from "../../reducers";

export function* chapter16Saga(controller: CanvasManager) {
  const chapter16 = new Chapter16();
  controller.add(chapter16.scene);
  controller.requestAnimation(chapter16.updateOnAnimationFrame);
  yield takeEvery(press.type, chapter16CommandsSaga(chapter16));
}

function chapter16CommandsSaga(chapter16: Chapter16) {
  return function ({ payload }: PayloadAction<Press>) {
    switch (payload) {
      case Special.Space:
        chapter16.animate = !chapter16.animate;
        break;
      case Special.Enter:
        chapter16.morgan3d = !chapter16.morgan3d;
        break;
      case Arrow.Up:
        chapter16.morgan3dLevel++;
        break;
      case Arrow.Down:
        chapter16.morgan3dLevel--;
        break;
      default:
    }
  };
}
