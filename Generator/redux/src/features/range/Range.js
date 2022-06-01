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
            label="Range Min 1"
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
            label="Range Max 1"
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
            label="Range Min 2"
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
            label="Range Max 2"
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
            label="Range Min 1"
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
            label="Range Max 1"
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
            label="Range Min 2"
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
            label="Range Max 2"
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
            label="Range Min 3"
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
            label="Range Max 3"
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
            label="Range Min 4"
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
            label="Range Max 4"
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
            label="Range Min 1"
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
            label="Range Max 1"
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
            label="Range Min 2"
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
            label="Range Max 2"
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
            label="Range Min 3"
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
            label="Range Max 3"
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
            label="Range Min 4"
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
            label="Range Max 4"
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
            label="Range Min 5"
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
            label="Range Max 5"
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
            label="Range Min 6"
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
            label="Range Max 6"
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
