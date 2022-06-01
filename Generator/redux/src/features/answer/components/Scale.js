import React, { useState } from "react";

// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// ROUTER
import { Link } from "react-router-dom";

// REDUX
import { useDispatch, useSelector } from "react-redux";

const Scale = ({
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
  setMin,
  setMax,
  setMinText,
  setMidText,
  setMaxText,
  setMinValue,
  setMidValue,
  setMaxValue,
  setStep,
  setHideAnalogScaleSelectorNumber,
  handleSubmitScaleQuestion,
}) => {

  const booleans = [
    {
      label: "Vrai",
      value: true,
    },
    {
      label: "Faux",
      value: false,
    },
  ];

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
        label="Texte minimum"
        value={minText}
        onChange={(e) => setMinText(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Texte médian"
        value={midText}
        onChange={(e) => setMidText(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Texte maximum"
        value={maxText}
        onChange={(e) => setMaxText(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Valeur minimum affichée"
        value={minValue}
        onChange={(e) => setMinValue(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Valeur médian affichée" 
        value={midValue}
        onChange={(e) => setMidValue(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Valeur maximum affichée"
        value={maxValue}
        onChange={(e) => setMaxValue(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Step"
        type={`number`}
        value={step}
        onChange={(e) => setStep(e.target.value)}
      />
      <TextField
        id="outlined-select-currency-native"
        select
        label="Cacher le numéro du scale"
        value={hideAnalogScaleSelectorNumber}
        onChange={(e) => setHideAnalogScaleSelectorNumber(e.target.value)}
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
      <Link to="/tags">
        <Button variant="outlined" onClick={handleSubmitScaleQuestion}>
          Terminer tag
        </Button>
      </Link>
      <Link to="/modules">
        <Button variant="outlined" onClick={handleSubmitScaleQuestion}>
          Terminer module
        </Button>
      </Link>
    </>
  );
};

export default Scale;
