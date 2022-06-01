import React, { useEffect } from "react";

// MUI
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

// ROUTER
import { Link } from "react-router-dom";

const Text = ({
  regex,
  setRegex,
  handleSubmitTextQuestion 
}) => {
  useEffect(() => {
    console.log("Text");
  });
  return (
    <>
      <TextField
        required
        id="outlined-required"
        label="Regex"
        value={regex}
        onChange={(e) => setRegex(e.target.value)}
      />
      <Link to="/tags">
        <Button variant="outlined" onClick={handleSubmitTextQuestion}>
          Terminer tag
        </Button>
      </Link>
      <Link to="/modules">
        <Button variant="outlined" onClick={handleSubmitTextQuestion}>
          Terminer module
        </Button>
      </Link>
    </>
  );
};

export default Text;
