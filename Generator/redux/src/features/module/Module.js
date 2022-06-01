import React, { useEffect, useState } from "react";
import "./Module.css";

// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import {
  changeBaseModule,
  changeModule,
  buildFinalModule,
} from "./moduleSlice";
import { changeError, changeMessage } from "../error/errorSlice";
import { clearQuestions } from "../question/questionSlice";

// COMPONENTS
import Error from "../error/Error";
import List from "../list/List";

// REACT ROUTER
import { Link, Navigate } from "react-router-dom";

function Module() {
  // GLOBAL STATE
  const error = useSelector((state) => state.error.error);
  const modules = useSelector((state) => state.module.modules);
  const finalModule = useSelector((state) => state.module.finalModule);
  const module = useSelector((state) => state.module.module);
  const questions = useSelector((state) => state.question.questions);
  const form = useSelector((state) => state.form);

  // LOCAL STATE
  const [moduleOID, setModuleOID] = useState("");
  const [moduleTitle, setModuleTitle] = useState("");
  const [navigate, setNavigate] = useState(false);

  const dispatch = useDispatch();

  const resetFields = () => {
    setModuleOID("");
    setModuleTitle("");
  };

  const handleSubmit = () => {
    if (moduleOID === "" || moduleTitle === "") {
      dispatch(changeMessage("Champ(s) recquis manquant(s)"));
      dispatch(changeError(true));
    } else {
      dispatch(
        changeModule({
          moduleOID,
          moduleTitle,
        })
      );
      resetFields();
    }
  };

  useEffect(() => {
    if (questions.length > 0) {
      dispatch(buildFinalModule({ questions }));
      dispatch(changeBaseModule());
    }
  }, [dispatch, questions]);

  useEffect(() => {
    dispatch(clearQuestions());
  }, [dispatch]);

  return (
    <div className="module">
      <div className="module-layer">
        <List list={modules} title="Modules" />
        <h1>Module</h1>
        <TextField
          required
          id="outlined-required"
          label="OID du module"
          className="oid"
          value={moduleOID}
          onChange={(e) => setModuleOID(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          className="title"
          label="Titre du module"
          value={moduleTitle}
          onChange={(e) => setModuleTitle(e.target.value)}
        />
        <Link to="/tags">
          <Button variant="outlined" onClick={() => handleSubmit()}>
            Continuer
          </Button>
        </Link>
        {modules.length > 0 && (
          <Link to="/">
            <Button
              variant="outlined"
              // onClick={() => dispatch(injectModules(modules))}
            >
              Terminer
            </Button>
          </Link>
        )}
      </div>
      {error === true && <Error />}
    </div>
  );
}

export default Module;
