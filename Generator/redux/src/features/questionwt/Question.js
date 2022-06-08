import React, { useEffect, useState } from "react";
import "./Question.css";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { changeBaseQuestion, changeQuestion } from "./questionSlice";
import { injectQuestions } from "../form/formSlice";
import { changeError, changeMessage } from "../error/errorSlice";

// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// COMPONENT
import Error from "../error/Error";
import List from "../list/List";

// DATAS
import { questionTypes, booleans, scopes } from "./datas.questions";
import { Link } from "react-router-dom";

function Question() {
  // GLOBAL STATES
  const questions = useSelector((state) => state.question.questions);
  const tags = useSelector((state) => state.tag.tags);
  const currentTag = useSelector((state) => state.tag.tag);
  const error = useSelector((state) => state.error.error);
  const form = useSelector((state) => state.form);
  const modules = useSelector((state) => state.module.modules);
  const currentModule = useSelector((state) => state.module.module);

  // LOCAL STATES
  const [module, setModule] = useState("");
  const [questionOID, setQuestionOID] = useState(
    `q_${
      currentModule.moduleOID +
      "_" +
      questions.length.toString().padStart(3, "0")
    }`
  );
  const [questionText, setQuestionText] = useState("");
  const [tag, setTag] = useState("");
  const [type, setType] = useState("SINGLE_CHOICE_RADIO");
  const [isTriggered, setIsTriggered] = useState(false);
  const [isCalculation, setIsCalculation] = useState(false);
  const [isGlobal, setIsGlobal] = useState(false);
  const [isWithConditions, setIsWithConditions] = useState(false);
  const [calculation, setCalculation] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [trigger, setTrigger] = useState([]);
  const [triggeredQuestionOID, setTriggeredQuestionOID] = useState("");
  const [triggeredValue, setTriggeredValue] = useState(0);
  const [triggeredDefault, setTriggeredDefault] = useState(0);
  const [navigate, setNavigate] = useState(false);
  const [scope, setScope] = useState("MODULE_SCOPE");

  // DEFAULT MODULE STATE
  useEffect(() => {
    if (modules.length > 0) {
      setModule(modules[modules.length - 1].moduleOID);
    }
  }, [modules]);

  // DISPATCH
  const dispatch = useDispatch();

  const resetFields = () => {
    setQuestionOID("");
    setQuestionText("");
  };

  const handleSubmit = () => {
    if (questionOID === "" || questionText === "") {
      dispatch(changeMessage("Champ(s) recquis manquant(s)"));
      dispatch(changeError(true));
    } else {
      dispatch(
        changeQuestion({
          module,
          questionOID,
          questionText,
          tag,
          type,
          isTriggered,
          trigger,
          triggeredQuestionOID,
          triggeredValue,
          triggeredDefault,
          scope,
          isCalculation,
          calculation,
          isGlobal,
          isWithConditions,
          conditions,
        })
      );
      resetFields();
    }
  };

  useEffect(() => {
    if (questions.length > 0) {
      setTriggeredQuestionOID(questions[questions.length - 1].questionOID);
    }
  }, [questions]);

  console.log(questions);

  return (
    <div className="question">
      <div className="question-layer">
        <List list={tags} title="Tags" />
        <h1>Question {questions.length}</h1>
        <TextField
          required
          id="outlined-required"
          label="Question OID"
          value={questionOID}
          onChange={(e) => setQuestionOID(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Question Text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <TextField
          id="outlined-select-currency-native"
          select
          label="Type de question"
          value={type}
          onChange={(e) => setType(e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          {questionTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency-native"
          select
          label="isTriggered"
          value={isTriggered}
          onChange={(e) => setIsTriggered(e.target.value === "true")}
          SelectProps={{
            native: true,
          }}
        >
          {booleans.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        {isTriggered && (
          <>
            <TextField
              id="outlined-select-currency-native"
              select
              style={{ marginLeft: "30px" }}
              label="Triggered question"
              value={triggeredQuestionOID}
              onChange={(e) => setTriggeredQuestionOID(e.target.value)}
              SelectProps={{
                native: true,
              }}
            >
              {questions.map((option) => (
                <option key={option.questionOID} value={option.questionOID}>
                  {option.questionOID}
                </option>
              ))}
            </TextField>
            <TextField
              required
              style={{ marginLeft: "30px" }}
              id="outlined-required"
              label="Must Not be equal to :"
              value={triggeredValue}
              onChange={(e) => setTriggeredValue(e.target.value)}
            />
            <TextField
              required
              style={{ marginLeft: "30px" }}
              id="outlined-required"
              label="Default is :"
              value={triggeredDefault}
              onChange={(e) => setTriggeredDefault(e.target.value)}
            />
          </>
        )}
        {isTriggered && (
          <TextField
            id="outlined-select-currency-native"
            select
            label="Scope"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            SelectProps={{
              native: true,
            }}
          >
            {scopes.map((option) => (
              <option key={option.label} value={option.value}>
                {option.value}
              </option>
            ))}
          </TextField>
        )}
        <TextField
          id="outlined-select-currency-native"
          select
          label="isGlobal"
          value={isGlobal}
          onChange={(e) => setIsGlobal(e.target.value === "true")}
          SelectProps={{
            native: true,
          }}
        >
          {booleans.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency-native"
          select
          label="isCalculation"
          value={isCalculation}
          onChange={(e) => setIsCalculation(e.target.value === "true")}
          SelectProps={{
            native: true,
          }}
        >
          {booleans.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        {isCalculation && (
          <TextField
            required
            id="outlined-required"
            label="Calculation"
            value={calculation}
            onChange={(e) => setCalculation([e.target.value])}
          />
        )}
        <TextField
          id="outlined-select-currency-native"
          select
          label="isWithConditions"
          value={isWithConditions}
          onChange={(e) => setIsWithConditions(e.target.value === "true")}
          SelectProps={{
            native: true,
          }}
        >
          {booleans.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        {isWithConditions && (
          <TextField
            required
            id="outlined-required"
            label="Conditions"
            value={conditions}
            onChange={(e) => setConditions([e.target.value])}
          />
        )}
        <Link to="/answers">
          <Button variant="outlined" onClick={handleSubmit}>
            Continuer
          </Button>
        </Link>
        {/* {navigate && (
          <Link to="/answers">
            <Button
              variant="outlined"
              onClick={() => dispatch(injectQuestions(questions))}
            >
              Enregistrer
            </Button>
          </Link>
        )} */}
      </div>
      {error === true && <Error />}
    </div>
  );
}

export default Question;