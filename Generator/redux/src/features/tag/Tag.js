import React, { useEffect, useState } from "react";
import "./Tag.css";

// REDUX
import { useDispatch, useSelector } from "react-redux";
import { changeRangeNb } from "../range/rangeSlice";
import { changeTag } from "./tagSlice";
import { changeError, changeMessage } from "../error/errorSlice";

// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

// COMPONENTS
import Range from "../range/Range";
import Error from "../error/Error";
import List from "../list/List";

// DATAS
import {
  ranges,
  tagTypes,
  rangeMax2,
  rangeMax4,
  rangeMax6,
  rangeMin2,
  rangeMin4,
  rangeMin6,
} from "./datas.tag";
import { Link } from "react-router-dom";

function Tag() {
  // GLOBAL STATES
  const tags = useSelector((state) => state.tag.tags);
  const error = useSelector((state) => state.error.error);
  const rangeNb = useSelector((state) => state.range.rangeNb);
  const modules = useSelector((state) => state.module.modules);
  const currentModule = useSelector((state) => state.module.module);

  // DISAPTCH
  const dispatch = useDispatch();

  // LOCAL STATES
  const [tagOID, setTagOID] = useState("");
  const [tagTitle, setTagTitle] = useState("");
  const [tagDescription, setTagDescription] = useState("");
  const [tagType, setTagType] = useState("SCORE");
  const [parent, setParent] = useState("");
  const [rangeMin, setRangeMin] = useState([]);
  const [rangeMax, setRangeMax] = useState([]);
  const [navigate, setNavigate] = useState(false);
  const [sunburstName, setSunburstName] = useState("");

  const resetFields = () => {
    setTagOID("");
    setTagTitle("");
    setTagDescription("");
    setSunburstName("");
    setRangeMin([]);
    setRangeMax([]);
  };

  const handleCompleteRanges = () => {
    if (rangeNb === 2) {
      setRangeMin([...rangeMin2]);
      setRangeMax([...rangeMax2]);
    } else if (rangeNb === 4) {
      setRangeMin([...rangeMin4]);
      setRangeMax([...rangeMax4]);
    } else if (rangeNb === 6) {
      setRangeMin([...rangeMin6]);
      setRangeMax([...rangeMax6]);
    }
  };

  const handleChangeParent = (value) => {
    setParent(value);
    setTagOID(`${value}_`);
  };

  const handleSubmit = () => {
    if (
      tagOID === "" ||
      tagTitle === "" ||
      tagDescription === "" ||
      tagType === ""
    ) {
      dispatch(changeMessage("Champ(s) recquis manquant(s)"));
      dispatch(changeError(true));
    } else {
      dispatch(
        changeTag({
          tagOID,
          tagTitle,
          tagDescription,
          tagType,
          module: currentModule.moduleOID,
          parent,
          rangeMin,
          rangeMax,
          sunburstName,
        })
      );
      resetFields();
    }
  };

  const handleTag = () => {
    handleSubmit();
  };

  return (
    <div className="tag">
      <List list={tags} title="Tags" />
      <div className="tag-layer">
        <h1>Tags</h1>
        {tags.length > 0 && (
          <TextField
            id="outlined-select-currency-native"
            select
            label="Tag parent"
            value={`${parent}`}
            onChange={(e) => handleChangeParent(e.target.value)}
            SelectProps={{
              native: true,
            }}
          >
            <option key={"null"} value={""}></option>
            {tags.map((option) => (
              <option key={option.tagOID} value={option.tagOID}>
                {option.tagOID}
              </option>
            ))}
          </TextField>
        )}
        <TextField
          required
          id="outlined-required"
          label="Tag OID"
          value={tagOID}
          onChange={(e) => setTagOID(e.target.value.toUpperCase().trim())}
        />
        <TextField
          required
          id="outlined-required"
          label="Titre du tag"
          value={tagTitle}
          onChange={(e) => setTagTitle(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Description du tag"
          value={tagDescription}
          onChange={(e) => setTagDescription(e.target.value)}
        />
        <TextField
          id="outlined-select-currency-native"
          select
          label="Type de tag"
          value={tagType}
          onChange={(e) => setTagType(e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          {tagTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          required
          id="outlined-required"
          label="Nom du Tag (Sunburst)"
          value={sunburstName}
          onChange={(e) => setSunburstName(e.target.value.toUpperCase().trim())}
        />
        <TextField
          required
          id="outlined-select-currency-native"
          select
          label="Nombre de ranges"
          value={rangeNb}
          onChange={(e) => dispatch(changeRangeNb(parseInt(e.target.value)))}
          SelectProps={{
            native: true,
          }}
        >
          {ranges.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <Button variant="outlined" onClick={handleCompleteRanges}>
          Autocomplete Ranges
        </Button>
        <Range
          setRangeMin={setRangeMin}
          setRangeMax={setRangeMax}
          rangeMin={rangeMin}
          rangeMax={rangeMax}
        />
        {/* <Button variant="outlined" onClick={handleSubmit}>
          Ajouter {tagOID}
        </Button> */}
        <Link to="/questions">
          <Button variant="outlined" onClick={handleTag}>
            Continuer
          </Button>
        </Link>
        <Link to="/tags">
          <Button variant="outlined" onClick={handleTag}>
            Ajouter Tag sans Question
          </Button>
        </Link>
        <Link to="/questionswt">
          <Button variant="outlined">Ajouter Question sans Tag</Button>
        </Link>
        <Link to="/modules">
          <Button variant="outlined" onClick={handleTag}>
            Terminer module
          </Button>
        </Link>
      </div>
      {error === true && <Error />}
    </div>
  );
}

export default Tag;
