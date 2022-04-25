import { all, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { press } from "../../reducers";
import { CanvasManager } from "../../utils";
import { Chapter2 } from "../../chapters";
import { Press, Special } from "../../types";

export function* chapter2Saga(controller: CanvasManager) {
  const chapter2 = new Chapter2();
  controller.add(chapter2.scene);
  yield all([takeEvery(press.type, chapter2CommandsSaga(chapter2))]);
}

function chapter2CommandsSaga(chapter2: Chapter2) {
  return function ({ payload }: PayloadAction<Press>) {
    switch (payload) {
      case Special.Space:
        chapter2.switchColor();
        break;
      case Special.Enter:
        chapter2.switchRGB();
        break;
      default:
    }
  };
}
