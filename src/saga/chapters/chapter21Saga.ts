import { CanvasManager } from "../../utils";
import { PayloadAction } from "@reduxjs/toolkit";
import { Numpad, Press, Special } from "../../types";
import { takeEvery } from "redux-saga/effects";
import { press } from "../../reducers";
import { Chapter21 } from "../../chapters";

export function* chapter21Saga(controller: CanvasManager) {
  const dims = controller.dimensions;
  const chapter21 = dims
    ? new Chapter21(dims.width, dims.height)
    : new Chapter21();
  controller.add(chapter21.scene);
  controller.requestAnimation(chapter21.updateOnAnimationFrame);
  controller.setBackground(chapter21.background);
  controller.addPass(chapter21.bloomPass);

  yield takeEvery(press.type, chapter21CommandsSaga(chapter21, controller));
}

function chapter21CommandsSaga(
  chapter21: Chapter21,
  controller: CanvasManager
) {
  return function ({ payload }: PayloadAction<Press>) {
    switch (payload) {
      case Special.Space:
        controller.clearPasses();
        break;
      case Numpad.Numpad0:
        controller.addPass(chapter21.clearPass);
        break;
      case Numpad.Numpad1:
        controller.addPass(chapter21.adaptiveToneMappingPass);
        break;
      case Numpad.Numpad2:
        controller.addPass(chapter21.afterImagePass);
        break;
      case Numpad.Numpad3:
        controller.addPass(chapter21.bloomPass);
        break;
      default:
    }
  };
}
