import { all, takeLatest, put, select } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { updateMousePosition } from "../reducers";
import { setMousePosition } from "../reducers/mouseReducer";
import { MousePosition, RootState, ElementDimensions } from "../types";

export function* mouseSaga() {
  yield all([takeLatest(updateMousePosition.type, updateMousePositionSaga)]);
}

function* updateMousePositionSaga({ payload }: PayloadAction<MousePosition>) {
  const dimensions: ElementDimensions | null = yield select(
    (state: RootState) => state.canvas.dimensions
  );
  if (!dimensions) return;
  yield put(setMousePosition(adjustMousePosition(payload, dimensions)));
}

function adjustMousePosition(
  mouse: MousePosition,
  dimensions: ElementDimensions
): MousePosition {
  return [
    ((mouse[0] - dimensions.left) / dimensions.width) * 2 - 1,
    -((mouse[1] - dimensions.top) / dimensions.height) * 2 + 1,
  ];
}
