import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rangeNb: 2,
};

export const rangeSlice = createSlice({
  name: "range",
  initialState,
  reducers: {
    changeRangeNb: (state, action) => {
      state.rangeNb = action.payload;
    },
  },
});

export const { changeRangeNb } = rangeSlice.actions;

export default rangeSlice.reducer;
