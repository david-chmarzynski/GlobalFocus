import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  modules: [],
  module: {
    moduleOID: null,
    moduleTitle: null,
  },
  finalModule: {
    moduleOID: null,
    moduleTitle: null,
    questions: [],
  },
};

export const moduleSlice = createSlice({
  name: "module",
  initialState,
  reducers: {
    changeBaseModule: (state, action) => {
      state.modules = [...state.modules, state.finalModule];
    },
    changeModule: (state, action) => {
      state.module = {
        moduleOID: action.payload.moduleOID,
        moduleTitle: action.payload.moduleTitle,
      };
    },
    buildFinalModule: (state, action) => {
      console.log("paylaod :", action.payload.questions);
      state.finalModule = {
        moduleOID: state.module.moduleOID,
        moduleTitle: state.module.moduleTitle,
        questions: action.payload.questions,
      };
    },
  },
});

export const { changeBaseModule, changeModule, buildFinalModule } =
  moduleSlice.actions;

export default moduleSlice.reducer;
