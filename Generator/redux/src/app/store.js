import { configureStore } from "@reduxjs/toolkit";

// REDUCERS
import counterReducer from "../features/counter/counterSlice";
import formReducer from "../features/form/formSlice";
import errorReducer from "../features/error/errorSlice";
import tagReducer from "../features/tag/tagSlice";
import rangeReducer from "../features/range/rangeSlice";
import questionReducer from "../features/question/questionSlice";
import answerReducer from "../features/answer/answerSlice";
import moduleReducer from "../features/module/moduleSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    form: formReducer,
    error: errorReducer,
    tag: tagReducer,
    range: rangeReducer,
    question: questionReducer,
    answer: answerReducer,
    module: moduleReducer,
  },
});
