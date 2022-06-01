import React from "react";
import "./Result.css";

// REACT JSON VIEW
import ReactJson from "react-json-view";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { changeBaseQuestionnary, injectAnswers } from "../form/formSlice";
import { changeError, changeMessage } from "../error/errorSlice";

// COMPONENTS
import Error from "../error/Error";
import List from "../list/List";

function Result() {
  // GLOBAL STATE
  const error = useSelector((state) => state.error.error);
  const answers = useSelector((state) => state.answer.answers);
  const questions = useSelector((state) => state.question.questions);
  const form = useSelector((state) => state.form.finalQuestionnary);

  const dispatch = useDispatch();

  console.log(form);

  const element = document.createElement("a");
  const textFile = new Blob([[JSON.stringify(form)], {type: 'text/json'}]);
  element.href = URL.createObjectURL(textFile);
  element.download = `${form.questionaryName}.json`;
  document.body.appendChild(element); 
  element.click();

  return (
    <div className="result">
      <div className="result-layer">
        <List list={questions} title="Tags" />
        <h1>Résultat</h1>
        <ReactJson
          src={form}
          theme="monokai"
          onEdit={(updated_src) => console.log(updated_src)}
        />
      </div>
      {error === true && <Error />}
    </div>
  );
}

export default Result;
