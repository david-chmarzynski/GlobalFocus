import React from "react";

// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// ROUTER
import { Link } from "react-router-dom";

const Classic = ({
  text,
  setText,
  value,
  setValue,
  handleSubmitQuestion,
  currentQuestion,
  handleSubmit,
  answers,
  isExclusive,
  setIsExclusive,
  isTagSet,
  addTag,
}) => {
  return (
    <>
      <TextField
        required
        id="outlined-required"
        label="Intitulé de la réponse"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <TextField
        required
        id="outlined-required"
        label="Valeur de la réponse"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {currentQuestion.type === "MULTI_CHOICES" && 
        <FormGroup onChange={() => setIsExclusive(!isExclusive)}>
          <FormControlLabel control={<Checkbox />} label="Is exclusive" />
        </FormGroup>
      }
      
      {(!addTag || isTagSet )&&
        <>
          <Button variant="outlined" onClick={() => handleSubmit()}>
            Ajouter
          </Button>

          <Link to="/tags">
            <Button variant="outlined" onClick={handleSubmitQuestion}>
              Terminer tag
            </Button>
          </Link>

          <Link to="/modules">
            <Button variant="outlined" onClick={handleSubmitQuestion}>
              Terminer module
            </Button>
          </Link>
        </>
      }

    </>
  );
};

export default Classic;
