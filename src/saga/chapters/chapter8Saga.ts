import { PayloadAction } from "@reduxjs/toolkit";
import { CanvasManager } from "../../utils";
import { Chapter8 } from "../../chapters";
import { Press, Arrow, Special, Key } from "../../types";
import { takeEvery } from "redux-saga/effects";
import { press } from "../../reducers";

export function* chapter8Saga(controller: CanvasManager) {
  const chapter8 = new Chapter8();
  controller.add(chapter8.scene);
  yield takeEvery(press.type, chapter8CommandsSaga(chapter8));
}

function chapter8CommandsSaga(chapter8: Chapter8) {
  return function ({ payload }: PayloadAction<Press>) {
    switch (payload) {
      case Arrow.Up:
        chapter8.ySize += 0.1;
        break;
      case Arrow.Down:
        chapter8.ySize -= 0.1;
        break;
      case Arrow.Right:
        chapter8.xSize += 0.1;
        break;
      case Arrow.Left:
        chapter8.xSize -= 0.1;
        break;
      case Special.Space:
        chapter8.switch();
        break;
      case Key.D:
        chapter8.x += 0.1;
        break;
      case Key.A:
        chapter8.x -= 0.1;
        break;
      case Key.W:
        chapter8.y += 0.1;
        break;
      case Key.S:
        chapter8.y -= 0.1;
        break;
      default:
    }
  };
}
