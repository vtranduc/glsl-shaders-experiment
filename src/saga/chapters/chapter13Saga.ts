import { takeEvery } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { Chapter13 } from "../../chapters";
import { CanvasManager } from "../../utils";
import { Press, Special } from "../../types";
import { press } from "../../reducers";

export function* chapter13Saga(controller: CanvasManager) {
  const chapter13 = new Chapter13();
  controller.add(chapter13.scene);
  controller.setCameraPosition(50, 50, 50);
  controller.requestAnimation(chapter13.updateOnAnimationFrame);
  yield takeEvery(press.type, chapter13CommandsSaga(chapter13));
}

function chapter13CommandsSaga(chapter13: Chapter13) {
  return function ({ payload }: PayloadAction<Press>) {
    switch (payload) {
      case Special.BracketRight:
        chapter13.r += 0.1;
        break;
      case Special.BracketLeft:
        chapter13.r -= 0.1;
        break;
      case Special.Quote:
        chapter13.g += 0.1;
        break;
      case Special.Semicolon:
        chapter13.g -= 0.1;
        break;
      case Special.Slash:
        chapter13.b += 0.1;
        break;
      case Special.Period:
        chapter13.b -= 0.1;
        break;
      case Special.Space:
        chapter13.toggleWireframe();
        break;
      case Special.Enter:
        chapter13.lights = !chapter13.lights;
        break;
      default:
    }
  };
}
