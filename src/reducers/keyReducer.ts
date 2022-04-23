import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Key, KeyPress } from "../types";
import { mapRecord } from "../utils";

const initialState: KeyPress = {
  key: mapRecord(Object.values(Key), false),
};

const keySlice = createSlice({
  name: "key",
  initialState,
  reducers: {
    pressKey(state, { payload }: PayloadAction<Key>) {
      state.key[payload] = true;
    },
    releaseKey(state, { payload }: PayloadAction<Key>) {
      state.key[payload] = false;
    },
  },
});

export const { pressKey, releaseKey } = keySlice.actions;

export default keySlice.reducer;
