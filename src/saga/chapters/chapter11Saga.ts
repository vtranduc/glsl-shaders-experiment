import { PayloadAction } from "@reduxjs/toolkit";
import { CanvasManager } from "../../utils";
import { Chapter11 } from "../../chapters";
import { Press, Arrow, Special } from "../../types";
import { takeEvery } from "redux-saga/effects";
import { press } from "../../reducers";

export function* chapter11Saga(controller: CanvasManager) {
  const chapter11 = new Chapter11();
  controller.add(chapter11.scene);
  yield takeEvery(press.type, chapter11CommandsSaga(chapter11));
}

function chapter11CommandsSaga(chapter11: Chapter11) {
  return function ({ payload }: PayloadAction<Press>) {
    switch (payload) {
      case Special.Space:
        chapter11.switch();
        break;
      case Arrow.Up:
        chapter11.width += 0.1;
        break;
      case Arrow.Down:
        chapter11.width -= 0.1;
        break;
      case Arrow.Right:
        chapter11.thickness += 0.1;
        break;
      case Arrow.Left:
        chapter11.thickness -= 0.1;
        break;
      case Special.BracketRight:
        chapter11.amplitude += 0.1;
        break;
      case Special.BracketLeft:
        chapter11.amplitude -= 0.1;
        break;
      case Special.Quote:
        chapter11.frequency += 0.1;
        break;
      case Special.Semicolon:
        chapter11.frequency -= 0.1;
        break;
      default:
    }
  };
}
