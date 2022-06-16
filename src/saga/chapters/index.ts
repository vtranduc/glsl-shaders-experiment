import { takeLatest, select } from "redux-saga/effects";
import { goToChapter } from "../../reducers";
import { CanvasManager } from "../../utils";
import { RootState, Chapter } from "../../types";
import { chapter1Saga } from "./chapter1Saga";
import { chapter2Saga } from "./chapter2Saga";
import { chapter3Saga } from "./chapter3Saga";
import { chapter4Saga } from "./chapter4Saga";
import { chapter5Saga } from "./chapter5Saga";
import { chapter6Saga } from "./chapter6Saga";
import { chapter7Saga } from "./chapter7Saga";
import { chapter8Saga } from "./chapter8Saga";
import { chapter9Saga } from "./chapter9Saga";
import { chapter10Saga } from "./chapter10Saga";
import { chapter11Saga } from "./chapter11Saga";
import { chapter12Saga } from "./chapter12Saga";
import { chapter13Saga } from "./chapter13Saga";
import { chapter14Saga } from "./chapter14Saga";
import { chapter15Saga } from "./chapter15Saga";
import { chapter16Saga } from "./chapter16Saga";
import { chapter17Saga } from "./chapter17Saga";
import { chapter18Saga } from "./chapter18Saga";
import { chapter19Saga } from "./chapter19Saga";
import { chapter20Saga } from "./chapter20Saga";
import { chapter21Saga } from "./chapter21Saga";

export function* chapterSaga(controller: CanvasManager) {
  yield takeLatest(goToChapter.type, getChapterSaga(controller));
}

function getChapterSaga(controller: CanvasManager) {
  return function* () {
    // clean

    controller.clear();

    // load chapter saga

    const chapter: Chapter = yield select(
      (state: RootState) => state.chapter.chapter
    );

    switch (chapter) {
      case 1:
        yield chapter1Saga(controller);
        break;
      case 2:
        yield chapter2Saga(controller);
        break;
      case 3:
        yield chapter3Saga(controller);
        break;
      case 4:
        yield chapter4Saga(controller);
        break;
      case 5:
        yield chapter5Saga(controller);
        break;
      case 6:
        yield chapter6Saga(controller);
        break;
      case 7:
        yield chapter7Saga(controller);
        break;
      case 8:
        yield chapter8Saga(controller);
        break;
      case 9:
        yield chapter9Saga(controller);
        break;
      case 10:
        yield chapter10Saga(controller);
        break;
      case 11:
        yield chapter11Saga(controller);
        break;
      case 12:
        yield chapter12Saga(controller);
        break;
      case 13:
        yield chapter13Saga(controller);
        break;
      case 14:
        yield chapter14Saga(controller);
        break;
      case 15:
        yield chapter15Saga(controller);
        break;
      case 16:
        yield chapter16Saga(controller);
        break;
      case 17:
        yield chapter17Saga(controller);
        break;
      case 18:
        yield chapter18Saga(controller);
        break;
      case 19:
        yield chapter19Saga(controller);
        break;
      case 20:
        yield chapter20Saga(controller);
        break;
      case 21:
        yield chapter21Saga(controller);
        break;
      default:
    }
  };
}
