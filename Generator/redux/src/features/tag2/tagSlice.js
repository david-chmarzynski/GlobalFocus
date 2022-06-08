import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tags: [],
  tag: {
    tagOID: null,
    tagTitle: null,
    tagDescription: null,
    tagType: null,
    module: null,
    sunburstName: null,
    rangeMin: [],
    rangeMax: [],
    parent: null,
    children: [],
  },
};

export const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    changeTag: (state, action) => {
      state.tag = {
        tagOID: action.payload.tagOID,
        tagTitle: action.payload.tagTitle,
        tagDescription: action.payload.tagDescription,
        tagType: action.payload.tagType,
        sunburstName: action.payload.sunburstName,
        module: action.payload.module,
        rangeMin: action.payload.rangeMin,
        rangeMax: action.payload.rangeMax,
        parent: action.payload.parent,
        children: [],
      };
      state.tags = [...state.tags, state.tag];
    },
  },
});

export const { changeTag } = tagSlice.actions;

export default tagSlice.reducer;
