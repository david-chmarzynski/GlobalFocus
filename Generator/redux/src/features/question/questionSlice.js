import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  questions: [],
  question: {
    module: null,
    questionOID: null,
    questionText: null,
    type: null,
    isTriggered: null,
    triggeredQuestionOID: null,
    triggeredValue: null,
    triggeredDefault: null,
    tag: null,
    scope: null,
    isGlobal: null,
    isCalculation: null,
    calculation: null,
    isWithConditions: null,
    conditions: null,
  },
  finalQuestion: {
    module: null,
    questionOID: null,
    questionText: null,
    type: null,
    isTriggered: null,
    triggeredQuestionOID: null,
    triggeredValue: null,
    triggeredDefault: null,
    tag: null,
    scope: null,
    isGlobal: null,
    isCalculation: null,
    calculation: null,
    isWithConditions: null,
    conditions: null,
    answers: [],
  },
};

export const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    // Bouton enregistrer la question
    changeBaseQuestion: (state, action) => {
      state.questions = [...state.questions, state.finalQuestion];
    },
    // Bouton Terminer la question
    changeQuestion: (state, action) => {
      console.log(action.payload);
      state.question = {
        module: action.payload.module,
        questionOID: action.payload.questionOID,
        questionText: action.payload.questionText,
        type: action.payload.type,
        isTriggered: action.payload.isTriggered,
        triggeredQuestionOID: action.payload.triggeredQuestionOID,
        triggeredValue: action.payload.triggeredValue,
        triggeredDefault: action.payload.triggeredDefault,
        tag: action.payload.tag,
        scope: action.payload.scope,
        isGlobal: action.payload.isGlobal,
        isCalculation: action.payload.isCalculation,
        calculation: action.payload.calculation,
        isWithConditions: action.payload.isWithConditions,
        conditions: action.payload.conditions,
      };
    },
    changeQuestionWithAnswers: (state, action) => {
      state.finalQuestion = {
        module: state.question.module,
        questionOID: state.question.questionOID,
        questionText: state.question.questionText,
        type: state.question.type,
        isTriggered: state.question.isTriggered,
        triggeredQuestionOID: state.question.triggeredQuestionOID,
        triggeredValue: state.question.triggeredValue,
        triggeredDefault: state.question.triggeredDefault,
        tag: state.question.tag,
        scope: state.question.scope,
        isGlobal: state.question.isGlobal,
        isCalculation: state.question.isCalculation,
        calculation: state.question.calculation,
        isWithConditions: state.question.isWithConditions,
        conditions: state.question.conditions,
        answers: [
          ...action.payload.answers,
          {
            text: action.payload.text,
            value: action.payload.value,
            isExclusive: action.payload.isExclusive,
          },
        ],
      };
    },
    changeQuestionWithTextAnswers: (state, action) => {
      state.finalQuestion = {
        module: state.question.module,
        questionOID: state.question.questionOID,
        questionText: state.question.questionText,
        type: state.question.type,
        isTriggered: state.question.isTriggered,
        trigger: state.question.trigger,
        tag: state.question.tag,
        scope: state.question.scope,
        isGlobal: state.question.isGlobal,
        isCalculation: state.question.isCalculation,
        calculation: state.question.calculation,
        isWithConditions: state.question.isWithConditions,
        conditions: state.question.conditions,
        answers: [
          ...action.payload.answers,
          {
            regex: action.payload.regex,
          },
        ],
      };
    },
    changeQuestionWithNumAnswers: (state, action) => {
      state.finalQuestion = {
        module: state.question.module,
        questionOID: state.question.questionOID,
        questionText: state.question.questionText,
        type: state.question.type,
        isTriggered: state.question.isTriggered,
        trigger: state.question.trigger,
        tag: state.question.tag,
        scope: state.question.scope,
        isGlobal: state.question.isGlobal,
        isCalculation: state.question.isCalculation,
        calculation: state.question.calculation,
        isWithConditions: state.question.isWithConditions,
        conditions: state.question.conditions,
        answers: [
          ...action.payload.answers,
          {
            min: action.payload.min,
            max: action.payload.max,
            step: action.payload.step,
          },
        ],
      };
    },
    changeQuestionWithScaleAnswers: (state, action) => {
      state.finalQuestion = {
        module: state.question.module,
        questionOID: state.question.questionOID,
        questionText: state.question.questionText,
        type: state.question.type,
        isTriggered: state.question.isTriggered,
        triggeredQuestionOID: state.question.triggeredQuestionOID,
        triggeredValue: state.question.triggeredValue,
        triggeredDefault: state.question.triggeredDefault,
        tag: state.question.tag,
        scope: state.question.scope,
        isGlobal: state.question.isGlobal,
        isCalculation: state.question.isCalculation,
        calculation: state.question.calculation,
        isWithConditions: state.question.isWithConditions,
        conditions: state.question.conditions,
        answers: [
          ...action.payload.answers,
          {
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
          },
        ],
      };
    },
    clearQuestions: (state, action) => {
      state.questions = [];
    },
  },
});

export const {
  changeBaseQuestion,
  changeQuestion,
  saveQuestion,
  changeQuestionWithAnswers,
  changeQuestionWithTextAnswers,
  changeQuestionWithNumAnswers,
  changeQuestionWithScaleAnswers,
  clearQuestions,
} = questionSlice.actions;

export default questionSlice.reducer;
