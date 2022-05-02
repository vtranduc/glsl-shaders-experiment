import { PayloadAction } from "@reduxjs/toolkit";
import { Chapter12 } from "../../chapters";
import { CanvasManager } from "../../utils";
import { Press, Arrow, Key } from "../../types";
import { takeEvery } from "redux-saga/effects";
import { press } from "../../reducers";

export function* chapter12Saga(controller: CanvasManager) {
  const chapter12 = new Chapter12();
  controller.add(chapter12.scene);
  yield takeEvery(press.type, chapter12CommandsSaga(chapter12));
}

function chapter12CommandsSaga(chapter12: Chapter12) {
  return function ({ payload }: PayloadAction<Press>) {
    switch (payload) {
      case Arrow.Right:
        chapter12.angle -= Math.PI / 16;
        break;
      case Arrow.Left:
        chapter12.angle += Math.PI / 16;
        break;
      case Key.D:
        chapter12.xFlip = !chapter12.xFlip;
        break;
      case Key.A:
        chapter12.xFlip = !chapter12.xFlip;
        break;
      case Key.W:
        chapter12.yFlip = !chapter12.yFlip;
        break;
      case Key.S:
        chapter12.yFlip = !chapter12.yFlip;
        break;
      default:
    }
  };
}
