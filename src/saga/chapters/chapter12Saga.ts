import { all, takeLatest, select } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { Chapter12 } from "../../chapters";
import { CanvasManager } from "../../utils";
import {
  Press,
  Arrow,
  Key,
  Special,
  RootState,
  FileData,
  ImageEXT,
  MousePosition,
} from "../../types";
import { press, dropFile } from "../../reducers";

export function* chapter12Saga(controller: CanvasManager) {
  const chapter12 = new Chapter12();
  controller.add(chapter12.scene);
  yield all([
    takeLatest(dropFile.type, dropFileSaga(chapter12, controller)),
    takeLatest(press.type, chapter12CommandsSaga(chapter12)),
  ]);
}

function dropFileSaga(chapter12: Chapter12, controller: CanvasManager) {
  return function* () {
    const files: FileData[] = yield select(
      (state: RootState) => state.dragAndDrop.files
    );
    if (!files.length) return;
    if (!Object.values(ImageEXT).includes(files[0].ext)) return;
    const mousePosition: MousePosition = yield select(
      (state: RootState) => state.mouse.position
    );
    if (!controller.intersectObject(chapter12.scene, mousePosition)) return;
    chapter12.image = files[0].blob;
  };
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
      case Special.Space:
        chapter12.rgb = getRandomRGB() + getRandomRGB() + getRandomRGB();
        break;
      case Special.Enter:
        chapter12.rgb = "rgb";
        break;
      default:
    }
  };
}

function getRandomRGB() {
  return ["r", "g", "b"][Math.floor(Math.random() * 3)];
}
