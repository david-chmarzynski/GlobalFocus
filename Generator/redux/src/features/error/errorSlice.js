import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
  message: "",
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    changeError: (state, action) => {
      state.error = action.payload;
    },
    changeMessage: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { changeError, changeMessage } = errorSlice.actions;

export default errorSlice.reducer;
