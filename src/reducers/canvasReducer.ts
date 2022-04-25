import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CanvasState } from "../types";

const initialState: CanvasState = {};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    appendToDiv(state, action: PayloadAction<string>) {},

    removeFromDiv() {},

    fitToDiv() {},

    clear() {},
  },
});

export const { appendToDiv, removeFromDiv, clear, fitToDiv } =
  canvasSlice.actions;

export default canvasSlice.reducer;
