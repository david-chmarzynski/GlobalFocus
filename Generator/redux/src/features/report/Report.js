import { useEffect, useState }  from "react";

import axios from 'axios';
import './Report.css'
import { Button } from "@mui/material";

import QuestionTextSelector from "./QuestionTextSelector";
import QuestionAnswerSelector from "./QuestionAnswerSelector";
import TextInput from "./TextInput";
import ReportElement from "./ReportElement";
import BreakLine from "./BreakLine";
import IfQuestionAnswered from "./IfQuestionAnswered";

export default function Report() {

  const BASE_URL = 'http://152.228.208.173:8040'
  const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkNTJhMDQ4My0yNDJjLTRmNzUtODM2OS03OGI3ZGY5MDBiNDQiLCJ0eXBlIjoiQURNSU4iLCJpYXQiOjE2NTc4NzcyMTh9.IjLUq7cgkbBLEk6iTc1zgq2GXnDuuNosNQAAJfg4gtQ'
  
  const [report, setReport] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [elementId, setElementId] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(()=> {
    axios.get(`${BASE_URL}/questions`, {
      headers: {
        Authorization:`Bearer ${TOKEN}`,
      }
    }).then((response) => {
      setQuestions(response.data);
    }).catch((error) => {console.error(error);});
  }, []);

  useEffect(()=> {
    let newOptions = []
    questions.map((question)=>{
      return newOptions.push({value: question.oid, label: question.oid})
    })
    setOptions(newOptions)
  },[questions]);

  useEffect(()=> {
    console.log(report)
  },[report]);

  function addReportElement(newElementText, newElementDisplay){
    setReport([...report, {id: elementId, text: newElementText, display: newElementDisplay}]);
    setElementId(elementId + 1);
  }
  
  function reportResult(){
    let res = "";
    for(let i=0 ; i< report.length ; i++){
      res+= report[i].text + ' ';
    }

    console.log(res);
  }

  return(
    <div className="report">
      <div className="reportContainer">
        {
          report.map((element) => {

            return(
              <ReportElement key={element.id} element={element} report={report} setReport={setReport}/>
            );
          })
        }
        
      </div>
      
      <div className="inputs">
        <TextInput addToReport={addReportElement}/>
        <BreakLine addToReport={addReportElement}/> 
        <QuestionTextSelector options={options} addToReport={addReportElement}/>
        <QuestionAnswerSelector options={options} addToReport={addReportElement}/>
        <IfQuestionAnswered options={options} addToReport={addReportElement}/>
      </div>

      <div className="buttons">

        <Button 
          className=""
          variant="contained"
          color="success"
          onClick={() => reportResult()}
        >
          Valider
        </Button>
      </div>
    </div>
  
  );
  
}
