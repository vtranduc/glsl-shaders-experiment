import { Chapter20 } from "../../chapters";
import { CanvasManager } from "../../utils";
import { PayloadAction } from "@reduxjs/toolkit";
import { Press, Numpad, Arrow } from "../../types";
import { takeEvery } from "redux-saga/effects";
import { press } from "../../reducers";
import * as THREE from "three";

export function* chapter20Saga(controller: CanvasManager) {
  const chapter20 = new Chapter20((cubeTexture: THREE.CubeTexture) =>
    controller.setBackground(cubeTexture)
  );
  controller.add(chapter20.scene);
  yield takeEvery(press.type, chapter20CommandsSaga(chapter20));
}

function chapter20CommandsSaga(chapter20: Chapter20) {
  return function ({ payload }: PayloadAction<Press>) {
    switch (payload) {
      case Numpad.Numpad1:
        chapter20.setGeometry(0);
        break;
      case Numpad.Numpad2:
        chapter20.setGeometry(1);
        break;
      case Numpad.Numpad3:
        chapter20.setGeometry(2);
        break;
      case Arrow.Up:
      case Arrow.Down:
      case Arrow.Left:
      case Arrow.Right:
        chapter20.handleScaleCommand(payload);
        break;
      default:
    }
  };
}
