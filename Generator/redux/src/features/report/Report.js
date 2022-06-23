import { useState }  from "react";

import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';

import './Report.css'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function Report() {

  const [inputs, setInputs] = useState([0,1]);
  const [inputsValues, setInputsValues] = useState(["",""]);
  const [inputType, setInputType] = useState(0);
  
  function Inputs(params){

    let type = params.type;
    let id= params.id;

    if(type===0) return(
      <div className="textInput" >
        <TextField
          placeholder="Write some text"
          variant="standard"
          multiline
          maxRows={7}
          value={inputsValues[id]}
          onChange={(e) => {
            let newValues = [...inputsValues]
            console.log(newValues)
            newValues[id]=e.target.value
            console.log(newValues)
            setInputsValues(newValues);
            console.log(inputsValues)
          }}
        />
      </div>
    );

    if(type===1) return(
      <div className="addButton" >
        <IconButton aria-label="add"
          onClick={() =>{
            let newInputs = [...inputs]
            newInputs[id]=2
            
            setInputs(newInputs);
          }}>
          <Add/>
        </IconButton>
      </div>   
    );

    if(type===2) return(
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="inputTypeLabel">Input</InputLabel>
        <Select
          id="inputType"
          labelId="inputTypeLabel"
          defaultValue={-1}
          label="Age"
          onChange={(e) => {
            let newInputs = [...inputs]
            newInputs[id]=e.target.value
            newInputs.push(1);

            let newValues = [...inputsValues]
            newValues.push("");
            
            setInputs(newInputs);
            setInputsValues(newValues);
          }}
        >
          <MenuItem value={0}>Champ texte</MenuItem>
        </Select>
      </FormControl>
    );

    return(<div>error</div>)
  }


  return(
    <div className="form">
      <div className="reportContainer">
        {
          inputs.map((value, index) => {

            return(<Inputs type = {value} id={index} key={index}/>);
          })
        }
      </div>

      <div className="buttons">
        <Button 
          className=""
          variant="contained"
          color="success"
          onClick={() => console.log()}
        >
          Valider
        </Button>

        <Button 
          className=""
          variant="contained"
          color="error"
          onClick={() => console.log()}
        >
          Supprimer le dernier élément
        </Button>
      </div>
    </div>
  
  );
  
}
