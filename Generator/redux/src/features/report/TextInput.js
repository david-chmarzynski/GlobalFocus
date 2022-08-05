import { useState }  from "react";

import IconButton from '@mui/material/IconButton';
import Add from '@mui/icons-material/Add';
import './Report.css'
import { TextField } from "@mui/material";

export default function TextInput({addToReport}) {
    const [textValue, setTextValue] = useState("")

    return(
        <form className="textInput" onSubmit={ (e) => {
            e.preventDefault();
            if(textValue) addToReport(textValue, textValue);
            setTextValue("");
          }}>
            <TextField
              label = "Add some text"
              variant="outlined"
              color="primary"
              fullWidth
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
            <IconButton aria-label="add" type="submit">
                <Add/>
            </IconButton>
        </form>
    );
}   