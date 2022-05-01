import { PayloadAction } from "@reduxjs/toolkit";
import { CanvasManager } from "../../utils";
import { Chapter9 } from "../../chapters";
import { Press, Arrow } from "../../types";
import { takeEvery } from "redux-saga/effects";
import { press } from "../../reducers";

export function* chapter9Saga(controller: CanvasManager) {
  const chapter9 = new Chapter9();
  controller.add(chapter9.scene);
  controller.requestAnimation(chapter9.updateOnAnimationFrame);
  yield takeEvery(press.type, chapter9CommandsSaga(chapter9));
}

function chapter9CommandsSaga(chapter9: Chapter9) {
  return function ({ payload }: PayloadAction<Press>) {
    switch (payload) {
      case Arrow.Up:
        chapter9.y += 1;
        break;
      case Arrow.Down:
        chapter9.y -= 1;
        break;
      case Arrow.Right:
        chapter9.x += 1;
        break;
      case Arrow.Left:
        chapter9.x -= 1;
        break;
      default:
    }
  };
}
