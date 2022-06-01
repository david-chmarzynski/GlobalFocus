import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  answers: [],
  answer: {
    text: null,
    value: null,
  },
};

export const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    // changeBaseAnswer: (state, action) => {
    //   state.answers = [
    //     ...state.answers,
    //     {
    //       text: action.payload.text,
    //       value: action.payload.value,
    //       questionOID: action.payload.questionOID,
    //     },
    //   ];
    // },
    changeBaseAnswer: (state, action) => {
      state.answers = [...state.answers, state.answer];
    },
    changeAnswer: (state, action) => {
      if (isNaN(action.payload.value.replace('"', ""))) {
        state.answer = {
          text: action.payload.text,
          value: action.payload.value,
          isExclusive: action.payload.isExclusive,
        };
      } else {
        state.answer = {
          text: action.payload.text,
          value: parseInt(action.payload.value),
          isExclusive: action.payload.isExclusive,
        };
      }
    },
    changeTextAnswer: (state, action) => {
      state.answer = {
        regex: action.payload.regex,
      };
    },
    changeNumAnswer: (state, action) => {
      state.answer = {
        min: action.payload.min,
        max: action.payload.max,
        step: action.payload.step,
      };
    },
    changeScaleAnswer: (state, action) => {
      state.answer = {
        min: action.payload.min,
        max: action.payload.max,
        minText: action.payload.minText,
        midText: action.payload.midText,
        maxText: action.payload.maxText,
        minValue: action.payload.minValue,
        midValue: action.payload.midValue,
        maxValue: action.payload.maxValue,
        step: action.payload.step,
        hideAnalogScaleSelectorNumber:
          action.payload.hideAnalogScaleSelectorNumber,
      };
    },
    clearAnswers: (state, action) => {
      console.log("clearing");
      state.answers = [];
    },
  },
});

export const {
  changeBaseAnswer, //adds last answer to answers
  changeAnswer, //choice answers
  changeTextAnswer,
  changeNumAnswer,
  changeScaleAnswer,
  clearAnswers,
} = answerSlice.actions;

export default answerSlice.reducer;
