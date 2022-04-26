import { takeLatest, select } from "redux-saga/effects";
import { goToChapter } from "../../reducers";
import { CanvasManager } from "../../utils";
import { RootState, Chapter } from "../../types";
import { chapter1Saga } from "./chapter1Saga";
import { chapter2Saga } from "./chapter2Saga";
import { chapter3Saga } from "./chapter3Saga";
import { chapter4Saga } from "./chapter4Saga";

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
      default:
    }
  };
}
