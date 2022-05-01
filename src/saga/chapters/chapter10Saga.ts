import { PayloadAction } from "@reduxjs/toolkit";
import { CanvasManager } from "../../utils";
import { Chapter10 } from "../../chapters";
import { Press, Arrow, Special, Key } from "../../types";
import { takeEvery } from "redux-saga/effects";
import { press } from "../../reducers";

export function* chapter10Saga(controller: CanvasManager) {
  const chapter10 = new Chapter10();
  controller.add(chapter10.scene);
  yield takeEvery(press.type, chapter10CommandsSaga(chapter10));
}

function chapter10CommandsSaga(chapter10: Chapter10) {
  return function ({ payload }: PayloadAction<Press>) {
    switch (payload) {
      case Arrow.Up:
        chapter10.y2 += 0.1;
        break;
      case Arrow.Down:
        chapter10.y2 -= 0.1;
        break;
      case Arrow.Right:
        chapter10.x2 += 0.1;
        break;
      case Arrow.Left:
        chapter10.x2 -= 0.1;
        break;
      case Key.D:
        chapter10.x1 += 0.1;
        break;
      case Key.A:
        chapter10.x1 -= 0.1;
        break;
      case Key.W:
        chapter10.y1 += 0.1;
        break;
      case Key.S:
        chapter10.y1 -= 0.1;
        break;
      case Special.BracketRight:
        chapter10.radius += 0.1;
        break;
      case Special.BracketLeft:
        chapter10.radius -= 0.1;
        break;
      case Special.Quote:
        chapter10.lineWidth += 0.1;
        break;
      case Special.Semicolon:
        chapter10.lineWidth -= 0.1;
        break;
      case Special.Slash:
        chapter10.smooth += 0.1;
        break;
      case Special.Period:
        chapter10.smooth -= 0.1;
        break;
      default:
    }
  };
}
