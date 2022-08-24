import React from "react";
import "./App.css";

// IMPORT COMPONENTS
import Form from "./features/form/Form";
import Tag from "./features/tag/Tag";
import Question from "./features/question/Question";
import QuestionWT from "./features/questionwt/Question";
import Navigation from "./features/navigation/Navigation";
import Answer from "./features/answer/Answer";
import Module from "./features/module/Module";
import Result from "./features/result/Result";
import Report from "./features/report/Report";

// REACT ROUTER
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/tags" element={<Tag />} />
        <Route path="/questions" element={<Question />} />
        <Route path="/questionswt" element={<QuestionWT />} />
        <Route path="/answers" element={<Answer />} />
        <Route path="/modules" element={<Module />} />
        <Route path="/result" element={<Result />} />
        <Route path="/report" element={<Report />} />
      </Routes>
      <Navigation />
    </div>
  );
}

export default App;
