import { all, takeLatest, put, select } from "redux-saga/effects";
import { RootState, Chapter } from "../types";
import {
  goToChapter,
  enableDragAndDrop,
  disableDragAndDrop,
} from "../reducers";

const dragAndDropEnabledChapters: Chapter[] = [12];

function* goToChapterSaga() {
  const { chapter, enabled }: { chapter: Chapter; enabled: boolean } =
    yield select((state: RootState) => {
      return {
        chapter: state.chapter.chapter,
        enabled: state.dragAndDrop.enabled,
      };
    });
  if (dragAndDropEnabledChapters.includes(chapter)) {
    if (!enabled) yield put(enableDragAndDrop());
  } else if (enabled) yield put(disableDragAndDrop());
}

export function* dragAndDropSaga() {
  yield all([takeLatest(goToChapter.type, goToChapterSaga)]);
}
