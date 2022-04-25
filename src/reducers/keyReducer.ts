import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Key, KeyState, Arrow, Special, Press } from "../types";
import { mapRecord } from "../utils";

const presses = (Object.values(Key) as Press[])
  .concat(Object.values(Arrow))
  .concat(Object.values(Special));

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
