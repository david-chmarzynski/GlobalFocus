import React, { useState } from "react";

// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// ROUTER
import { Link } from "react-router-dom";

// REDUX
import { useDispatch, useSelector } from "react-redux";

const Num = ({
  min,
  max,
  step,
  setMin,
  setMax,
  setStep,
  handleSubmitNumQuestion,
}) => {
  // REDUX STATE
  const tag = useSelector((state) => state.question.tag);

  return (
    <>
      <TextField
        required
        id="outlined-required"
        label="Valeur minimum"
        type={`number`}
        value={min}
        onChange={(e) => setMin(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Valeur maximum"
        type={`number`}
        value={max}
        onChange={(e) => setMax(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Step"
        type={`number`}
        value={step}
        onChange={(e) => setStep(e.target.value)}
      />
      <Link to="/tags">
        <Button variant="outlined" onClick={handleSubmitNumQuestion}>
          Terminer tag
        </Button>
      </Link>
      <Link to="/modules">
        <Button variant="outlined" onClick={handleSubmitNumQuestion}>
          Terminer module
        </Button>
      </Link>
    </>
  );
};

export default Num;
