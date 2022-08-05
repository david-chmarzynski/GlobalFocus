import { useEffect, useState }  from "react";

import axios from 'axios';
import './Report.css'
import { Button } from "@mui/material";

import QuestionTextSelector from "./QuestionTextSelector";
import TextInput from "./TextInput";
import ReportElement from "./ReportElement";
import BreakLine from "./BreakLine";
import IfQuestionAnswered from "./IfQuestionAnswered";
import IfQuestionNotAnswered from "./IfQuestionNotAnswered";
import EndIfQuestion from "./EndIfQuestion";
import PatientInfo from "./PatientInfo";
import SingleChoiceAnswerSelector from "./SingleChoiceAnswerSelector";
import MultiChoiceAnswerSelector from "./MultiChoiceAnswerSelector";

export default function Report() {

  const BASE_URL = 'http://152.228.208.173:8040'
  const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkNTJhMDQ4My0yNDJjLTRmNzUtODM2OS03OGI3ZGY5MDBiNDQiLCJ0eXBlIjoiQURNSU4iLCJpYXQiOjE2NTc4NzcyMTh9.IjLUq7cgkbBLEk6iTc1zgq2GXnDuuNosNQAAJfg4gtQ'
  
  const [report, setReport] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [newElementId, setNewElementId] = useState(0);
  const [options, setOptions] = useState([]);

  const [ifStatements, setIfStatements] = useState([]); // oid de questions pour permettre de générer des end if correspondants : "{{/oid_question}}"

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
    if(questions){
      let newOptions = []
      let questionsSorted = [...questions];
      questionsSorted.sort((a, b) => a.oid.localeCompare(b.oid))
      questionsSorted.map((question)=>{
        return newOptions.push({value: question.oid, label: question.oid})
      })
      setOptions(newOptions)
    }
  },[questions]);

  useEffect(()=> {
    console.log(report)
  },[report]);

  function addReportElement(newElementText, newElementDisplay, format = true, ifStatement = false){
    setReport([...report, {id: newElementId, text: newElementText.trim(), display: newElementDisplay, format: format, ifStatement : ifStatement, italics : false, bold : false, title : 0}])
    setNewElementId(newElementId + 1);
  }

  async function addIfStatement(questionOid){
    setIfStatements([...ifStatements, {id: newElementId, oid: questionOid}]);
  }
  
  function reportResult(){
    let res = "";
    for(let i=0 ; i< report.length ; i++){
      if(report[i].title) {
        res+= '  \\n';
        for(let level = 1 ; level <= report[i].title ; level ++) res += '#';
        res += ' '
      }

      if(report[i].italics) res+= '*';
      if(report[i].bold) res+= '**';
      res+= report[i].text;
      if(report[i].bold) res+= '**';
      if(report[i].italics) res+=  '*';
      res+= ' ';

      if(report[i].title) res+= '  \\n'
      
      
    }

    console.log(res);
  }

  return(
    <div className="report">
      <div className="reportContainer">
        {
          report.map((element) => {

            return(
              <ReportElement 
                key={element.id} 
                element={element} 
                report={report} 
                setReport={setReport}
                ifStatements={ifStatements}
                setIfStatements={setIfStatements}
              />
            );
          })
        }
        
      </div>
      
      <div className="inputs">
        <TextInput addToReport={addReportElement}/>
        <BreakLine addToReport={addReportElement}/> 
        <PatientInfo addToReport={addReportElement}/>
        <QuestionTextSelector options={options} addToReport={addReportElement}/>
        <SingleChoiceAnswerSelector options={options} addToReport={addReportElement}/>
        <MultiChoiceAnswerSelector options={options} addToReport={addReportElement}/>
        <IfQuestionAnswered options={options} addToReport={addReportElement} addIfStatement={addIfStatement}/>
        <IfQuestionNotAnswered options={options} addToReport={addReportElement} addIfStatement={addIfStatement}/>
        <EndIfQuestion addToReport={addReportElement} ifStatements={ifStatements} setIfStatements={setIfStatements}/>
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
