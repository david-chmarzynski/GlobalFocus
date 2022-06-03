import React, { useState } from "react";
import "./Range.css";

// REDUX
import { useSelector } from "react-redux";

// MUI
import TextField from "@mui/material/TextField";

function Range({ setRangeMin, setRangeMax, rangeMin, rangeMax }) {
  // GLOBAL STATE
  const rangeNb = useSelector((state) => state.range.rangeNb);
  if (rangeNb === 2)
    return (
      <div className="ranges">
        <div className="ranges-block">
          <TextField
            type="number"
            className="green"
            required
            id="outlined-required"
            label={rangeMin[0] !== undefined ? `${rangeMin[0]}` : "Range Min 1"}
            defaultValue=""
            onChange={(e) =>
              setRangeMin([
                (rangeMin[0] = parseInt(e.target.value)),
                (rangeMin[1] = rangeMin[1]),
              ])
            }
          />
          <TextField
            type="number"
            className="green"
            required
            id="outlined-required"
            label={rangeMax[0] !== undefined ? `${rangeMax[0]}` : "Range Max 1"}
            defaultValue=""
            onChange={(e) =>
              setRangeMax([
                (rangeMax[0] = parseInt(e.target.value)),
                (rangeMax[1] = rangeMax[1]),
              ])
            }
          />
        </div>
        <div className="ranges-block">
          <TextField
            type="number"
            className="red"
            required
            id="outlined-required"
            label={rangeMin[1] !== undefined ? `${rangeMin[1]}` : "Range Min 2"}
            defaultValue=""
            onChange={(e) =>
              setRangeMin([
                (rangeMin[0] = rangeMin[0]),
                (rangeMin[1] = parseInt(e.target.value)),
              ])
            }
          />
          <TextField
            type="number"
            className="red"
            required
            id="outlined-required"
            label={rangeMax[1] !== undefined ? `${rangeMax[1]}` : "Range Max 2"}
            defaultValue=""
            onChange={(e) =>
              setRangeMax([
                (rangeMax[0] = rangeMax[0]),
                (rangeMax[1] = parseInt(e.target.value)),
              ])
            }
          />
        </div>
      </div>
    );
  if (rangeNb === 4)
    return (
      <div className="ranges">
        <div className="ranges-block">
          <TextField
            type="number"
            className="green"
            required
            id="outlined-required"
            label={rangeMin[0] !== undefined ? `${rangeMin[0]}` : "Range Min 1"}
            defaultValue=""
            onChange={(e) =>
              setRangeMin([
                (rangeMin[0] = parseInt(e.target.value)),
                (rangeMin[1] = rangeMin[1]),
                (rangeMin[2] = rangeMin[2]),
                (rangeMin[3] = rangeMin[3]),
              ])
            }
          />
          <TextField
            type="number"
            className="green"
            required
            id="outlined-required"
            label={rangeMax[0] !== undefined ? `${rangeMax[0]}` : "Range Max 1"}
            defaultValue=""
            onChange={(e) =>
              setRangeMax([
                (rangeMax[0] = parseInt(e.target.value)),
                (rangeMax[1] = rangeMax[1]),
                (rangeMax[2] = rangeMax[2]),
                (rangeMax[3] = rangeMax[3]),
              ])
            }
          />
        </div>
        <div className="ranges-block">
          <TextField
            type="number"
            className="yellow"
            required
            id="outlined-required"
            label={rangeMin[1] !== undefined ? `${rangeMin[1]}` : "Range Min 2"}
            defaultValue=""
            onChange={(e) =>
              setRangeMin([
                (rangeMin[0] = rangeMin[0]),
                (rangeMin[1] = parseInt(e.target.value)),
                (rangeMin[2] = rangeMin[2]),
                (rangeMin[3] = rangeMin[3]),
              ])
            }
          />
          <TextField
            type="number"
            className="yellow"
            required
            id="outlined-required"
            label={rangeMax[1] !== undefined ? `${rangeMax[1]}` : "Range Max 2"}
            defaultValue=""
            onChange={(e) =>
              setRangeMax([
                (rangeMax[0] = rangeMax[0]),
                (rangeMax[1] = parseInt(e.target.value)),
                (rangeMax[2] = rangeMax[2]),
                (rangeMax[3] = rangeMax[3]),
              ])
            }
          />
        </div>
        <div className="ranges-block">
          <TextField
            type="number"
            className="orange"
            required
            id="outlined-required"
            label={rangeMin[2] !== undefined ? `${rangeMin[2]}` : "Range Min 3"}
            defaultValue=""
            onChange={(e) =>
              setRangeMin([
                (rangeMin[0] = rangeMin[0]),
                (rangeMin[1] = rangeMin[1]),
                (rangeMin[2] = parseInt(e.target.value)),
                (rangeMin[3] = rangeMin[3]),
              ])
            }
          />
          <TextField
            type="number"
            className="orange"
            required
            id="outlined-required"
            label={rangeMax[2] !== undefined ? `${rangeMax[2]}` : "Range Max 3"}
            defaultValue=""
            onChange={(e) =>
              setRangeMax([
                (rangeMax[0] = rangeMax[0]),
                (rangeMax[1] = rangeMax[1]),
                (rangeMax[2] = parseInt(e.target.value)),
                (rangeMax[3] = rangeMax[3]),
              ])
            }
          />
        </div>
        <div className="ranges-block">
          <TextField
            type="number"
            className="red"
            required
            id="outlined-required"
            label={rangeMin[3] !== undefined ? `${rangeMin[3]}` : "Range Min 4"}
            defaultValue=""
            onChange={(e) =>
              setRangeMin([
                (rangeMin[0] = rangeMin[0]),
                (rangeMin[1] = rangeMin[1]),
                (rangeMin[2] = rangeMin[2]),
                (rangeMin[3] = parseInt(e.target.value)),
              ])
            }
          />
          <TextField
            type="number"
            className="red"
            required
            id="outlined-required"
            label={rangeMax[3] !== undefined ? `${rangeMax[3]}` : "Range Max 4"}
            defaultValue=""
            onChange={(e) =>
              setRangeMax([
                (rangeMax[0] = rangeMax[0]),
                (rangeMax[1] = rangeMax[1]),
                (rangeMax[2] = rangeMax[2]),
                (rangeMax[3] = parseInt(e.target.value)),
              ])
            }
          />
        </div>
      </div>
    );
  if (rangeNb === 6)
    return (
      <div className="ranges">
        <div className="ranges-block">
          <TextField
            type="number"
            className="green"
            required
            id="outlined-required"
            label={rangeMin[0] !== undefined ? `${rangeMin[0]}` : "Range Min 1"}
            defaultValue=""
            onChange={(e) =>
              setRangeMin([
                (rangeMin[0] = parseInt(e.target.value)),
                (rangeMin[1] = rangeMin[1]),
                (rangeMin[2] = rangeMin[2]),
                (rangeMin[3] = rangeMin[3]),
                (rangeMin[4] = rangeMin[4]),
                (rangeMin[5] = rangeMin[5]),
              ])
            }
          />
          <TextField
            type="number"
            className="green"
            required
            id="outlined-required"
            label={rangeMax[0] !== undefined ? `${rangeMax[0]}` : "Range Max 1"}
            defaultValue=""
            onChange={(e) =>
              setRangeMax([
                (rangeMax[0] = parseInt(e.target.value)),
                (rangeMax[1] = rangeMax[1]),
                (rangeMax[2] = rangeMax[2]),
                (rangeMax[3] = rangeMax[3]),
                (rangeMax[4] = rangeMax[4]),
                (rangeMax[5] = rangeMax[5]),
              ])
            }
          />
        </div>
        <div className="ranges-block">
          <TextField
            type="number"
            className="light-green"
            required
            id="outlined-required"
            label={rangeMin[1] !== undefined ? `${rangeMin[1]}` : "Range Min 2"}
            defaultValue=""
            onChange={(e) =>
              setRangeMin([
                (rangeMin[0] = rangeMin[0]),
                (rangeMin[1] = parseInt(e.target.value)),
                (rangeMin[2] = rangeMin[2]),
                (rangeMin[3] = rangeMin[3]),
                (rangeMin[4] = rangeMin[4]),
                (rangeMin[5] = rangeMin[5]),
              ])
            }
          />
          <TextField
            type="number"
            className="light-green"
            required
            id="outlined-required"
            label={rangeMax[1] !== undefined ? `${rangeMax[1]}` : "Range Max 2"}
            defaultValue=""
            onChange={(e) =>
              setRangeMax([
                (rangeMax[0] = rangeMax[0]),
                (rangeMax[1] = parseInt(e.target.value)),
                (rangeMax[2] = rangeMax[2]),
                (rangeMax[3] = rangeMax[3]),
                (rangeMax[4] = rangeMax[4]),
                (rangeMax[5] = rangeMax[5]),
              ])
            }
          />
        </div>
        <div className="ranges-block">
          <TextField
            type="number"
            className="yellow"
            required
            id="outlined-required"
            label={rangeMin[2] !== undefined ? `${rangeMin[2]}` : "Range Min 3"}
            defaultValue=""
            onChange={(e) =>
              setRangeMin([
                (rangeMin[0] = rangeMin[0]),
                (rangeMin[1] = rangeMin[1]),
                (rangeMin[2] = parseInt(e.target.value)),
                (rangeMin[3] = rangeMin[3]),
                (rangeMin[4] = rangeMin[4]),
                (rangeMin[5] = rangeMin[5]),
              ])
            }
          />
          <TextField
            type="number"
            className="yellow"
            required
            id="outlined-required"
            label={rangeMax[2] !== undefined ? `${rangeMax[2]}` : "Range Max 3"}
            defaultValue=""
            onChange={(e) =>
              setRangeMax([
                (rangeMax[0] = rangeMax[0]),
                (rangeMax[1] = rangeMax[1]),
                (rangeMax[2] = parseInt(e.target.value)),
                (rangeMax[3] = rangeMax[3]),
                (rangeMax[4] = rangeMax[4]),
                (rangeMax[5] = rangeMax[5]),
              ])
            }
          />
        </div>
        <div className="ranges-block">
          <TextField
            type="number"
            className="orange"
            required
            id="outlined-required"
            label={rangeMin[3] !== undefined ? `${rangeMin[3]}` : "Range Min 4"}
            defaultValue=""
            onChange={(e) =>
              setRangeMin([
                (rangeMin[0] = rangeMin[0]),
                (rangeMin[1] = rangeMin[1]),
                (rangeMin[2] = rangeMin[2]),
                (rangeMin[3] = parseInt(e.target.value)),
                (rangeMin[4] = rangeMin[4]),
                (rangeMin[5] = rangeMin[5]),
              ])
            }
          />
          <TextField
            type="number"
            className="orange"
            required
            id="outlined-required"
            label={rangeMax[3] !== undefined ? `${rangeMax[3]}` : "Range Max 4"}
            defaultValue=""
            onChange={(e) =>
              setRangeMax([
                (rangeMax[0] = rangeMax[0]),
                (rangeMax[1] = rangeMax[1]),
                (rangeMax[2] = rangeMax[2]),
                (rangeMax[3] = parseInt(e.target.value)),
                (rangeMax[4] = rangeMax[4]),
                (rangeMax[5] = rangeMax[5]),
              ])
            }
          />
        </div>
        <div className="ranges-block">
          <TextField
            type="number"
            className="red"
            required
            id="outlined-required"
            label={rangeMin[4] !== undefined ? `${rangeMin[4]}` : "Range Min 5"}
            defaultValue=""
            onChange={(e) =>
              setRangeMin([
                (rangeMin[0] = rangeMin[0]),
                (rangeMin[1] = rangeMin[1]),
                (rangeMin[2] = rangeMin[2]),
                (rangeMin[3] = rangeMin[3]),
                (rangeMin[4] = parseInt(e.target.value)),
                (rangeMin[5] = rangeMin[5]),
              ])
            }
          />
          <TextField
            type="number"
            className="red"
            required
            id="outlined-required"
            label={rangeMax[4] !== undefined ? `${rangeMax[4]}` : "Range Max 5"}
            defaultValue=""
            onChange={(e) =>
              setRangeMax([
                (rangeMax[0] = rangeMax[0]),
                (rangeMax[1] = rangeMax[1]),
                (rangeMax[2] = rangeMax[2]),
                (rangeMax[3] = rangeMax[3]),
                (rangeMax[4] = parseInt(e.target.value)),
                (rangeMax[5] = rangeMax[5]),
              ])
            }
          />
        </div>
        <div className="ranges-block">
          <TextField
            type="number"
            className="deep-red"
            required
            id="outlined-required"
            label={rangeMin[5] !== undefined ? `${rangeMin[5]}` : "Range Min 6"}
            defaultValue=""
            onChange={(e) =>
              setRangeMin([
                (rangeMin[0] = rangeMin[0]),
                (rangeMin[1] = rangeMin[1]),
                (rangeMin[2] = rangeMin[2]),
                (rangeMin[3] = rangeMin[3]),
                (rangeMin[4] = rangeMin[4]),
                (rangeMin[5] = parseInt(e.target.value)),
              ])
            }
          />
          <TextField
            type="number"
            className="deep-red"
            required
            id="outlined-required"
            label={rangeMax[5] !== undefined ? `${rangeMax[5]}` : "Range Max 6"}
            defaultValue=""
            onChange={(e) =>
              setRangeMax([
                (rangeMax[0] = rangeMax[0]),
                (rangeMax[1] = rangeMax[1]),
                (rangeMax[2] = rangeMax[2]),
                (rangeMax[3] = rangeMax[3]),
                (rangeMax[4] = rangeMax[4]),
                (rangeMax[5] = parseInt(e.target.value)),
              ])
            }
          />
        </div>
      </div>
    );
}

export default Range;
