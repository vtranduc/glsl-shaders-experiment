import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MouseState, MousePosition } from "../types";

const initialState: MouseState = {
  position: [0, 0],
};

const mouseSlice = createSlice({
  name: "mouse",
  initialState,
  reducers: {
    updateMousePosition(state, action: PayloadAction<MousePosition>) {},

    setMousePosition(state, { payload }: PayloadAction<MousePosition>) {
      state.position = payload;
    },
  },
});

export const { updateMousePosition, setMousePosition } = mouseSlice.actions;

export default mouseSlice.reducer;
