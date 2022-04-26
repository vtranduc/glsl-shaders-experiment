import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CanvasState, ElementDimensions } from "../types";

const initialState: CanvasState = {
  dimensions: null,
};

const canvasSlice = createSlice({
  name: "canvas",
  initialState,
  reducers: {
    appendToDiv(state, action: PayloadAction<string>) {},

    removeFromDiv() {},

    fitToDiv() {},

    clear() {},

    setCanvasDimensions(
      state,
      { payload }: PayloadAction<ElementDimensions | null>
    ) {
      state.dimensions = payload;
    },
  },
});

export const {
  appendToDiv,
  removeFromDiv,
  clear,
  fitToDiv,
  setCanvasDimensions,
} = canvasSlice.actions;

export default canvasSlice.reducer;
