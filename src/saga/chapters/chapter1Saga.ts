import { all, takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { press } from "../../reducers";
import { CanvasManager } from "../../utils";
import { Chapter1 } from "../../chapters";
import { Arrow, Press, Special } from "../../types";

export function* chapter1Saga(controller: CanvasManager) {
  const chapter1 = new Chapter1();
  controller.add(chapter1.scene);
  yield all([takeEvery(press.type, chapter1CommandsSaga(chapter1))]);
}

function chapter1CommandsSaga(chapter1: Chapter1) {
  return ({ payload }: PayloadAction<Press>) => {
    switch (payload) {
      case Arrow.Up:
        chapter1.size++;
        break;
      case Arrow.Down:
        chapter1.size--;
        break;
      case Special.Space:
        chapter1.switchColor();
        break;
      case Arrow.Right:
        chapter1.opacity += 0.1;
        break;
      case Arrow.Left:
        chapter1.opacity -= 0.1;
        break;
      default:
    }
  };
}
