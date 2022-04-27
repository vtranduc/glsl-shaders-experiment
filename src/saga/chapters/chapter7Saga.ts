import { PayloadAction } from "@reduxjs/toolkit";
import { CanvasManager } from "../../utils";
import { Chapter7 } from "../../chapters";
import { Press, Arrow, Special, Key } from "../../types";
import { takeEvery } from "redux-saga/effects";
import { press } from "../../reducers";

export function* chapter7Saga(controller: CanvasManager) {
  const chapter7 = new Chapter7();
  controller.add(chapter7.scene);
  yield takeEvery(press.type, chapter7CommandsSaga(chapter7));
}

function chapter7CommandsSaga(chapter7: Chapter7) {
  return function ({ payload }: PayloadAction<Press>) {
    switch (payload) {
      case Arrow.Up:
        chapter7.yGeometry += 0.1;
        break;
      case Arrow.Down:
        chapter7.yGeometry -= 0.1;
        break;
      case Arrow.Right:
        chapter7.xGeometry += 0.1;
        break;
      case Arrow.Left:
        chapter7.xGeometry -= 0.1;
        break;
      case Special.Space:
        chapter7.switchMode();
        break;
      case Key.D:
        chapter7.x += 0.1;
        break;
      case Key.A:
        chapter7.x -= 0.1;
        break;
      case Key.W:
        chapter7.y += 0.1;
        break;
      case Key.S:
        chapter7.y -= 0.1;
        break;
      default:
    }
  };
}
