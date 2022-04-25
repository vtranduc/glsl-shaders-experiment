import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChapterState, Chapter } from "../types";

const initialState: ChapterState = { chapter: 1 };

const chapterSlice = createSlice({
  name: "chapter",
  initialState,
  reducers: {
    goToChapter(state, { payload }: PayloadAction<Chapter>) {
      state.chapter = payload;
    },
  },
});

export const { goToChapter } = chapterSlice.actions;

export default chapterSlice.reducer;
