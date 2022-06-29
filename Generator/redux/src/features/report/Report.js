import { useState }  from "react";

import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';

import './Report.css'
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";

export default function Report() {

  function handleChange(val){
    //let reportCopy = [...report]
    //reportCopy[id]=val

    setInputValue(val);
    //setReport(reportCopy);
  }

  const [inputValue, setInputValue] = useState("")
  const [report, setReport] = useState([""]);
  const [textInputNumber, setTextInputNumber] = useState(1);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionAnswerNumber, setQuestionAnswerNumber] = useState(0);
  
  function TextInput(){
    return(
      <div className="textInput" >
        <TextField
          placeholder="Write some text"
          variant="standard"
          multiline
          maxRows={7}
          value={inputValue}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    )
  }
  function QuestionInput(){

    return(
      <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="inputTypeLabel">Input</InputLabel>
        <Select
          id="inputType"
          labelId="inputTypeLabel"
          defaultValue={-1}
          label="Age"
          onChange={(e) => handleChange(e.target.value)}
        >
          <MenuItem value={0}>Champ texte</MenuItem>
        </Select>
      </FormControl>
    )
  }


  return(
    <div className="form">
      <div className="reportContainer">
        {
          // inputs.map((value, index) => {

          //   return(<Inputs type = {value} id={index} key={index}/>);
          // })
          //textInputNumber ? (<TextInput/>) : (<></>)
        }
        
      </div>
      <TextInput/>

      <div className="buttons">
        <div className="addButton" >
          <IconButton aria-label="add">
            <Add/>
          </IconButton>
        </div>   
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
