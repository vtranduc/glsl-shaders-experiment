import { CanvasManager } from "../../utils";
import { PayloadAction } from "@reduxjs/toolkit";
import { Numpad, Press, Special } from "../../types";
import { takeEvery } from "redux-saga/effects";
import { press } from "../../reducers";
import { Chapter22 } from "../../chapters";

export function* chapter22Saga(controller: CanvasManager) {
  const chapter22 = new Chapter22();
  controller.add(chapter22.scene);

  yield takeEvery(press.type, chapter22CommandsSaga(chapter22, controller));
}

function chapter22CommandsSaga(
  chapter22: Chapter22,
  controller: CanvasManager
) {
  return function ({ payload }: PayloadAction<Press>) {
    switch (payload) {
      case Special.Space:
        chapter22.switch();
        break;
      default:
    }
  };
}
