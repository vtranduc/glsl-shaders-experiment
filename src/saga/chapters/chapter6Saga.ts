import { PayloadAction } from "@reduxjs/toolkit";
import { CanvasManager } from "../../utils";
import { Chapter6 } from "../../chapters";
import { Press, Arrow, Special } from "../../types";
import { takeEvery } from "redux-saga/effects";
import { press } from "../../reducers";

export function* chapter6Saga(controller: CanvasManager) {
  const chapter6 = new Chapter6();
  controller.add(chapter6.scene);
  yield takeEvery(press.type, chapter6CommandsSaga(chapter6));
}

function chapter6CommandsSaga(chapter6: Chapter6) {
  return function ({ payload }: PayloadAction<Press>) {
    switch (payload) {
      case Arrow.Up:
        chapter6.size++;
        break;
      case Arrow.Down:
        chapter6.size--;
        break;
      case Special.Space:
        chapter6.switchGradient();
        break;
      default:
    }
  };
}
