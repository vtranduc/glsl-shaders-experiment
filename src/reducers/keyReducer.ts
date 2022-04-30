import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { KeyState, Press, presses } from "../types";
import { mapRecord } from "../utils";

const initialState: KeyState = mapRecord(presses, false);

const keySlice = createSlice({
  name: "key",
  initialState,
  reducers: {
    press(state, { payload }: PayloadAction<Press>) {
      state[payload] = true;
    },
    release(state, { payload }: PayloadAction<Press>) {
      state[payload] = false;
    },
  },
});

export const { press, release } = keySlice.actions;

export default keySlice.reducer;
