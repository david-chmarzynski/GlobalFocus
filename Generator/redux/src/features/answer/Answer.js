import React, { useEffect, useState } from "react";
import "./Answer.css";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  changeBaseAnswer,
  changeAnswer,
  changeTextAnswer,
  clearAnswers,
  changeNumAnswer,
  changeScaleAnswer,
} from "./answerSlice";
import {
  changeBaseQuestion,
  changeQuestionWithAnswers,
  changeQuestionWithTextAnswers,
  changeQuestionWithNumAnswers,
  changeQuestionWithScaleAnswers,
} from "../question/questionSlice";
import { changeError, changeMessage } from "../error/errorSlice";
import { buildFinalModule, changeBaseModule } from "../module/moduleSlice";

// COMPONENTS
import Error from "../error/Error";
import List from "../list/List";
import Scale from "./components/Scale";
import Text from "./components/Text";
import Classic from "./components/Classic";
import Num from "./components/Num";
import Tag from "../tag2/Tag";

// MUI
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// ROUTER
import { Link } from "react-router-dom";

function Answer() {
  // GLOBAL STATE
  const error = useSelector((state) => state.error.error);
  const answers = useSelector((state) => state.answer.answers);
  const answer = useSelector((state) => state.answer.answer);
  const questions = useSelector((state) => state.question.questions);
  const currentQuestion = useSelector((state) => state.question.question);
  // LOCAL STATE
  const [text, setText] = useState("");
  const [value, setValue] = useState(`${answers.length}`);
  const [question, setQuestion] = useState("");
  const [navigate, setNavigate] = useState(false);
  const [isExclusive, setIsExclusive] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [isTagSet, setIsTagSet] = useState(false);
  const [addTag, setAddTag] = useState(false);

  // LOCAL STATE TEXT QUESTION
  const [regex, setRegex] = useState("");

  // LOCAL STATE SCALE & NUM TYPE QUESTION
  const [min, setMin] = useState(1900);
  const [max, setMax] = useState(new Date().getFullYear());

  const [minText, setMinText] = useState("1900");
  const [midText, setMidText] = useState("");
  const [maxText, setMaxText] = useState("Cette année");

  const [minValue, setMinValue] = useState("1900");
  const [midValue, setMidValue] = useState("");
  const [maxValue, setMaxValue] = useState(new Date().getFullYear());

  const [step, setStep] = useState(1.0);
  const [hideAnalogScaleSelectorNumber, setHideAnalogScaleSelectorNumber] =
    useState(false);
  // QUESTION TYPES
  const scaleType = ["ANALOG_SCALE", "DIGITAL_SCALE"];
  const numType = ["INTEGER", "DECIMAL"];
  const simpleType = ["SINGLE_CHOICE", "MULTI_CHOICES", "SINGLE_CHOICE_RADIO"];
  const textType = ["TEXT"];

  console.log("currentQuestion :", currentQuestion.type);

  const dispatch = useDispatch();

  const resetFields = () => {
    setText("");
    setValue(`${answers.length + 1}`);
  };

  const handleSubmit = () => {
    if (text === "" || value === "") {
      dispatch(changeMessage("Champ(s) recquis manquant(s)"));
      dispatch(changeError(true));
    } else {
      dispatch(changeAnswer({ text, value, isExclusive, newTag }));
      dispatch(changeBaseAnswer());
      resetFields();
      setIsTagSet(false);
    }
  };

  const handleSubmitQuestion = () => {
    // choice questions
    if (text === "" || value === "") {
      dispatch(changeMessage("Champ(s) recquis manquant(s)"));
      dispatch(changeError(true));
    } else {
      dispatch(
        changeAnswer({
          text,
          value,
          isExclusive,
          newTag,
        })
      );
      dispatch(changeBaseAnswer());
      dispatch(
        changeQuestionWithAnswers({
          answers,
          text,
          value,
          isExclusive,
          newTag,
        })
      );
      dispatch(changeBaseQuestion());
      dispatch(clearAnswers());
      setIsTagSet(false);
    }
  };

  const handleSubmitTextQuestion = () => {
    dispatch(
      changeTextAnswer({
        regex,
      })
    );
    dispatch(changeBaseAnswer());
    dispatch(
      changeQuestionWithTextAnswers({
        answers,
        regex,
      })
    );
    dispatch(changeBaseQuestion());
    dispatch(clearAnswers());
  };

  const handleSubmitNumQuestion = () => {
    dispatch(
      changeNumAnswer({
        min,
        max,
        step,
      })
    );
    dispatch(changeBaseAnswer());
    dispatch(
      changeQuestionWithNumAnswers({
        answers,
        min,
        max,
        step,
      })
    );
    dispatch(changeBaseQuestion());
    dispatch(clearAnswers());
  };

  const handleSubmitScaleQuestion = () => {
    dispatch(
      changeScaleAnswer({
        min,
        max,
        minText,
        maxText,
        step,
      })
    );
    dispatch(changeBaseAnswer());
    dispatch(
      changeQuestionWithScaleAnswers({
        answers,
        min,
        max,
        minText,
        midText,
        maxText,
        minValue,
        midValue,
        maxValue,
        step,
        hideAnalogScaleSelectorNumber,
      })
    );
    dispatch(changeBaseQuestion());
    dispatch(clearAnswers());
  };

  return (
    <div className="answer">
      <div className="answer-layer">
        <List list={questions} key={question} title="Tags" />
        <h1>Réponse {answers.length}</h1>
        {textType.includes(`${currentQuestion.type}`) && (
          <Text
            regex={regex}
            setRegex={setRegex}
            handleSubmitTextQuestion={handleSubmitTextQuestion}
          />
        )}
        {simpleType.includes(`${currentQuestion.type}`) && (
          <Classic
            text={text}
            value={value}
            setText={setText}
            setValue={setValue}
            handleSubmit={handleSubmit}
            handleSubmitQuestion={handleSubmitQuestion}
            answers={answers}
            currentQuestion={currentQuestion}
            isExclusive={isExclusive}
            setIsExclusive={setIsExclusive}
            newTag={newTag}
            setNewTag={setNewTag}
            isTagSet={isTagSet}
          />
        )}
        {numType.includes(`${currentQuestion.type}`) && (
          <Num
            min={min}
            max={max}
            setMin={setMin}
            setMax={setMax}
            step={step}
            setStep={setStep}
            handleSubmitNumQuestion={handleSubmitNumQuestion}
          />
        )}
        {scaleType.includes(`${currentQuestion.type}`) && (
          <Scale
            min={min}
            max={max}
            setMin={setMin}
            setMax={setMax}
            step={step}
            setStep={setStep}
            minText={minText}
            midText={midText}
            maxText={maxText}
            setMinText={setMinText}
            setMidText={setMidText}
            setMaxText={setMaxText}
            minValue={minValue}
            midValue={midValue}
            maxValue={maxValue}
            setMinValue={setMinValue}
            setMidValue={setMidValue}
            setMaxValue={setMaxValue}
            hideAnalogScaleSelectorNumber={hideAnalogScaleSelectorNumber}
            setHideAnalogScaleSelectorNumber={setHideAnalogScaleSelectorNumber}
            handleSubmitScaleQuestion={handleSubmitScaleQuestion}
          />
        )}
        <FormGroup onChange={() => setAddTag(!addTag)}>
          <FormControlLabel
            control={<Checkbox />}
            label="Ajouter Tag"
            checked={addTag}
          />
        </FormGroup>
        {currentQuestion.type === "MULTI_CHOICES" && addTag && (
          <Tag
            newTag={newTag}
            setNewTag={setNewTag}
            setIsTagSet={setIsTagSet}
            setAddTag={setAddTag}
          />
        )}
      </div>
      {error === true && <Error />}
    </div>
  );
}

export default Answer;
