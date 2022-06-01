import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  questionnary: {
    questionaryName: "",
    chapterOID: "",
    chapterTitle: "",
    estimatedTime: "",
    pricing: 0,
    levelMax: 0,
    authors: [],
    professions: [],
    linkedForm: "",
    companyId: [],
    category: "",
    scoreStrategy: "",
    form: [],
  },
  finalQuestionnary: {
    questionaryName: "",
    chapterOID: "",
    chapterTitle: "",
    estimatedTime: "",
    pricing: 0,
    levelMax: 0,
    authors: [],
    professions: [],
    companyId: [],
    linkedForm: "",
    category: "",
    scoreStrategy: "",
    form: [],
    modules: [],
    tags: [],
  },
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    changeBaseQuestionnary: (state, action) => {
      state.questionnary.questionaryName = action.payload.questionaryName;
      state.questionnary.chapterOID = action.payload.chapterOID;
      state.questionnary.chapterTitle = action.payload.chapterTitle;
      state.questionnary.estimatedTime = action.payload.estimatedTime;
      state.questionnary.pricing = action.payload.pricing;
      state.questionnary.levelMax = action.payload.levelMax;
      state.questionnary.authors = [action.payload.authors];
      state.questionnary.companyId = [action.payload.companyId];
      state.questionnary.linkedForm = action.payload.linkedForm;
      state.questionnary.professions = [action.payload.professions];
      state.questionnary.category = action.payload.category;
      state.questionnary.scoreStrategy = action.payload.scoreStrategy;
      state.questionnary.form = [
        {
          formOID: action.payload.formOID,
          formTitle: action.payload.formTitle,
          formDescription: action.payload.formDescription,
        },
      ];
    },
    changeBaseForm: (state, action) => {
      state.questionnary.form[0].formOID = action.payload.formOID;
      state.questionnary.form[0].formTitle = action.payload.formTitle;
      state.questionnary.form[0].description = action.payload.description;
    },
    buildFinalForm: (state, action) => {
      state.finalQuestionnary.questionaryName =
        state.questionnary.questionaryName;
      state.finalQuestionnary.chapterOID = state.questionnary.chapterOID;
      state.finalQuestionnary.chapterTitle = state.questionnary.chapterTitle;
      state.finalQuestionnary.estimatedTime = state.questionnary.estimatedTime;
      state.finalQuestionnary.pricing = state.questionnary.pricing;
      state.finalQuestionnary.levelMax = state.questionnary.levelMax;
      state.finalQuestionnary.authors = state.questionnary.authors;
      state.finalQuestionnary.professions = state.questionnary.professions;
      state.finalQuestionnary.companyId = state.questionnary.companyId;
      state.finalQuestionnary.linkedForm = state.questionnary.linkedForm;
      state.finalQuestionnary.category = state.questionnary.category;
      state.finalQuestionnary.scoreStrategy = state.questionnary.scoreStrategy;
      state.finalQuestionnary.modules = action.payload.modules;
      state.finalQuestionnary.tags = action.payload.tags;
      state.finalQuestionnary.form = [
        {
          formOID: state.questionnary.form[0].formOID,
          formTitle: state.questionnary.form[0].formTitle,
          formDescription: state.questionnary.form[0].formDescription,
        },
      ];
    },
    // changeQuestionnary: (state, action) => {
    //   state.finalQuestionnary = {
    //     ...state.questionnary,
    //     modules: state.module.modules,
    //     tags: state.tag.tags,
    //   };
    // },
    // injectForm: (state, action) => {
    //   state.form = action.payload;
    // },
    // injectTags: (state, action) => {
    //   state.tags = action.payload;
    // },
    // injectModules: (state, action) => {
    //   state.modules = action.payload;
    // },
    // injectQuestions: (state, action) => {
    //   state.modules[0].questions = action.payload;
    // },
    // injectQuestions: (state, action) => {
    //   for (let i = 0; i < action.payload.length; i++) {
    //     state.modules.map((mod) => {
    //       if (mod.moduleOID === action.payload[i].module) {
    //         mod.questions = [...mod.questions, action.payload[i]];
    //       }
    //     });
    //   }
    // },
    // injectAnswers: (state, action) => {
    //   for (let i = 0; i < action.payload.length; i++) {
    //     for (let x = 0; x < state.modules.length; x++) {
    //       state.modules[x].questions.map((quest) => {
    //         if (quest.questionOID === action.payload[i].questionOID) {
    //           quest.answers = [...quest.answers, action.payload[i]];
    //         }
    //       });
    //     }
    //   }
    // },
  },
});

export const { changeBaseQuestionnary, changeBaseForm, buildFinalForm } =
  formSlice.actions;

export default formSlice.reducer;
