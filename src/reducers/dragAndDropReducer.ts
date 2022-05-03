import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DragAndDropState, FileData } from "../types";

const initialState: DragAndDropState = {
  enabled: false,
  files: [],
};

const dragAndDropSlice = createSlice({
  name: "dragAndDrop",
  initialState,
  reducers: {
    enableDragAndDrop(state) {
      state.enabled = true;
    },
    disableDragAndDrop(state) {
      state.enabled = false;
    },
    dropFile(state, { payload }: PayloadAction<FileData>) {
      state.files = [payload];
    },
  },
});

export const { enableDragAndDrop, disableDragAndDrop, dropFile } =
  dragAndDropSlice.actions;

export default dragAndDropSlice.reducer;
