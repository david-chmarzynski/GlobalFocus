import React, { useEffect, useState, useRef } from "react";
import "./Form.css";

// AXIOS
import axios from "axios";

// SUNBURST
import Sunburst from "sunburst-chart";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  changeBaseForm,
  changeBaseQuestionnary,
  buildFinalForm,
} from "./formSlice";
import { changeError, changeMessage } from "../error/errorSlice";

// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// COMPONENT
import Error from "../error/Error";
import List from "../list/List";

// REACT ROUTER
import { Navigate } from "react-router-dom";

// DATAS
import {
  professionsList,
  scoreStrategiesList,
  categoriesList,
} from "./form.datas";
// import SunburstView from "../sunburst/Sunburst";

function Form() {
  const error = useSelector((state) => state.error.error);
  const questions = useSelector((state) => state.question.questions);
  const answers = useSelector((state) => state.answer.answers);
  const form = useSelector((state) => state.form.finalQuestionnary);
  const questionnary = useSelector((state) => state.form.questionnary);
  const modules = useSelector((state) => state.module.modules);
  const tags = useSelector((state) => state.tag.tags);
  const dispatch = useDispatch();

  // LOCAL STATES
  const [questionaryName, setQuestionaryName] = useState("");
  const [formOID, setFormOID] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("5");
  const [pricing, setPricing] = useState(1);
  const [levelMax, setLevelMax] = useState(1);
  const [authors, setAuthors] = useState([]);
  const [professions, setProfessions] = useState("");
  const [category, setCategory] = useState("HEALTH");
  const [scoreStrategy, setScoreStrategy] = useState("SUM");
  const [navigate, setNavigate] = useState(false);
  const [companyId, setCompanyId] = useState({});
  const [linkedForm, setLinkedForm] = useState("");

  // const companies = useRef([]);
  const [companies, setCompanies] = useState([]);
  const [forms, setForms] = useState([]);

  useEffect(() => {
    setProfessions(professions);
  }, [professions]);

  useEffect(() => {
    axios
      .get("http://152.228.208.173:8040/companies?activated=true", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NWMyODc5Ni1iZDY1LTQ0YzEtOGE1YS0wMTA1N2ZlZTE0ZDkiLCJ0eXBlIjoiQURNSU4iLCJpYXQiOjE2NDUwMTI3Mjd9.MHBXVxlUjdyK3Xw0XCzSL27p3rkIFYyyDBy9o_hKmhk`,
        },
      })
      .then((response) => {
        setCompanies([{}, ...response.data]);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://152.228.208.173:8040/forms", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1NWMyODc5Ni1iZDY1LTQ0YzEtOGE1YS0wMTA1N2ZlZTE0ZDkiLCJ0eXBlIjoiQURNSU4iLCJpYXQiOjE2NDUwMTI3Mjd9.MHBXVxlUjdyK3Xw0XCzSL27p3rkIFYyyDBy9o_hKmhk`,
        },
      })
      .then((response) => {
        setForms([{}, ...response.data]);
      });
  }, []);

  const handleSubmit = () => {
    if (questionaryName === "" || authors.length === 0) {
      dispatch(changeMessage("Champ(s) recquis manquant(s)"));
      dispatch(changeError(true));
    } else {
      dispatch(
        changeBaseQuestionnary({
          questionaryName,
          chapterOID: `chap_${questionaryName}`,
          chapterTitle: `chap_${questionaryName}`,
          estimatedTime,
          pricing,
          levelMax,
          authors,
          professions,
          companyId,
          linkedForm,
          category,
          scoreStrategy,
          formOID,
          formTitle: formOID,
          formDescription: description,
        })
      );
      dispatch(
        changeBaseForm({
          formOID,
          formTitle: formOID,
          description,
        })
      );
      setNavigate(true);
    }
  };

  useEffect(() => {
    if (modules.length > 0 && tags.length > 0) {
      dispatch(buildFinalForm({ modules, tags }));
    }
  }, [dispatch, modules, tags]);
  // console.log(modules.length);

  const data = {
    name: "root",
    children: [
      {
        name: "Parent 1",
        value: 1,
        children: [
          {
            name: "Enfant P1",
            value: 1,
          },
        ],
      },
      {
        name: "Parent 2",
        value: 1,
        children: [
          {
            name: "Enfant P2",
            value: 1,
          },
        ],
      },
      {
        name: "Parent 3",
        value: 1,
        children: [
          {
            name: "Enfant P3",
            value: 1,
          },
        ],
      },
    ],
  };

  // ITERATION IN NODES \\
  // function searchReportingNode(element, matchingTagName) {
  //   console.log("element : ",element.tagOID);
  //   console.log("matchingTagName :",matchingTagName)
  //   if (element.tagOID === matchingTagName) {
  //     return element;
  //   } else if (element.children != null) {
  //     let result = null;
  //     for (let i = 0; result == null && i < element.children.length; i++) {
  //       result = searchReportingNode(element.children[i], matchingTagName);
  //     }
  //     return result;
  //   }
  //   return null;
  // };

  // const [datas, setDatas] = useState([{ name: "root", children: [] }]);

  // const organizeDatas = (tags) => {
  //   let newTagsList = tags;
  //   let parentList = [];
  //   let childrenList = [];
  //   for(let i = 0; i < newTagsList.length; i++){
  //     if(newTagsList[i].parent === "") {
  //       parentList.push(newTagsList[i]);
  //     } else {
  //       childrenList.push(newTagsList[i]);
  //     }
  //   }
  //   moveChildrenToParent(parentList, childrenList, tags);
  // };

  // const moveChildrenToParent = (parentList, childrenList, tags) => {
  //   let newTagsList = tags;
  //   let dataTmp = [];

  //   while(childrenList.length > 0){
  //     console.log(childrenList.length)
  //     for(let childIndex = 0; childIndex < childrenList.length; childIndex++){
  //       let parent;
  //       newTagsList[0].children.forEach(child => {
  //         parent = searchReportingNode(child, childrenList[childIndex].parent);
  //       });
  //       if(parent != null || parent === undefined){
  //         // DO NOTHING
  //       } else {
  //         let child = {
  //           name: childrenList[childIndex].tagOID,
  //           value: 1,
  //           children: [],
  //         };
  //         childrenList.splice(childIndex, 1);
  //         console.log(child)
  //       }
  //     }
  //   }

  //   setDatas(parentList);
  //   console.log(datas)
  // };

  // const moveChildrenToParent = (childrenList, datas) => {
  //   let baseForm = datas;
  //   while (childrenList.length > 0) {
  //     for (let childIndex = 0; childIndex < childrenList.length; childIndex++) {
  //       let parentNode;
  //       // console.log(childrenList[childIndex].parent)
  //       // console.log(baseForm)
  //       baseForm[0].children.forEach((tree) => {
  //         parentNode = searchReportingNode(
  //           tree,
  //           `${childrenList[childIndex].parent}`
  //         );

  //         if (parentNode == null || parentNode === undefined) {
  //           //do nothing
  //         } else {
  //           let child = {
  //             name: `${childrenList[childIndex].tagOID}`,
  //             value: 1,
  //             children: [],
  //           };
  //           // alterData(datas, parentNode, child);
  //           childrenList.splice(childIndex, 1);
  //           childIndex--; // je retire 1, car slice décale le reste du tableau (de la droite) vers la gauche
  //         }
  //       });
  //     }
  //   }
  //   return datas;
  // }

  // organizeDatas(tags);
  // const alterData = (datas, parentNode, child) => {
  //   console.log(datas)
  //   // console.log("newDatas :", newDatas)
  //   for(let i = 0; i < datas[0].children.length; i++) {
  //     if(datas[0].children[i].tagOID === parentNode.tagOID) {
  //       // newDatas[0].children[i].children[0].push(child);
  //       let newDatas = Object.assign(datas);
  //       newDatas[0].children[i].children = child;
  //       console.log("new :", newDatas)
  //       setDatas(newDatas);
  //     }
  //   }
  //   console.log(datas)
  //   return true;
  // }

  // const alterData = (datas, parentNode, child) => {
  //   let datasCopy = JSON.parse(JSON.stringify(datas));
  //   for(let i = 0; i < datasCopy[0].children.length; i++) {
  //     if(datasCopy[0].children[i].tagOID === parentNode.tagOID) {
  //       datasCopy[0].children[i].children.push(child);
  //       return setDatas(datasCopy);
  //     }
  //   }
  // }

  // const organizeDatas = (tags, datas) => {
  //   let childrenList = [];
  //   let newTagList = tags;
  //   console.log(newTagList)
  //   for(let i = 0; i < newTagList.length; i++){
  //     if(newTagList[i].parent === "") {
  //       console.log("ajoute tag parent")
  //       datas[0].children.push(tags[i]);
  //       newTagList.shift()
  //       i--;
  //       console.log(newTagList);
  //     } else {
  //       console.log("Ajoute tag enfant à la liste")
  //       childrenList.push(tags[i]);
  //       i--;
  //       newTagList.shift();
  //     }
  //   }
  //   addChildren(childrenList, datas);
  //   return datas;
  // };

  // organizeDatas(tags, datas);

  // const organizeDataRecursively = (tag, parent) => {
  //   const children = [];
  //   for (let i = 0; i < tag.length; i++) {
  //     if (tag[i].parent === parent) {
  //       children.push({
  //         name: tag[i].name,
  //         value: tag[i].value,
  //         children: organizeDataRecursively(tag, tag[i].name),
  //       });
  //     }
  //   }
  //   return children;
  // };

  // useEffect(() => {
  //   if(document.querySelector("#chart")){

  //     const chart = Sunburst().data(data)(document.querySelector("#chart"));
  //     }
  // }, [data]);

  // console.log(myChart.data(data))

  return (
    <div className="form" id="chart">
      <List list={questions} title="Questions" />
      <div className="form-layer">
        <h1>Nouveau questionnaire</h1>
        <TextField
          required
          id="outlined-required"
          label="Nom questionnaire"
          defaultValue=""
          onChange={(e) => setQuestionaryName(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="FormOID"
          defaultValue=""
          onChange={(e) => setFormOID(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Description"
          defaultValue=""
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          required
          id="outlined-number"
          label="Temps estimé"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setEstimatedTime(parseInt(e.target.value))}
        />
        <TextField
          required
          id="outlined-number"
          label="Prix"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setPricing(parseInt(e.target.value))}
        />
        <TextField
          required
          id="outlined-number"
          label="Niveau maximum"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setLevelMax(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Auteur"
          defaultValue=""
          onChange={(e) => setAuthors(e.target.value)}
        />
        <TextField
          id="outlined-select-currency-native"
          select
          label="LinkedForm"
          value={linkedForm}
          onChange={(e) => setLinkedForm(e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          {forms.map((option) => (
            <option key={option.formOID} value={option.formOID}>
              {option.title}
            </option>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Company ID"
          value={companyId}
          onChange={(e) => setCompanyId(e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          {companies.map((option) => (
            <option key={option.companyId} value={option.companyId}>
              {option.companyName}
            </option>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Professions"
          value={professions}
          onChange={(e) => setProfessions(e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          {professionsList.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          {categoriesList.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        <TextField
          id="outlined-select-currency-native"
          select
          label="Score stratégie"
          value={scoreStrategy}
          onChange={(e) => setScoreStrategy(e.target.value)}
          SelectProps={{
            native: true,
          }}
        >
          {scoreStrategiesList.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
        {navigate && (
          <Navigate to="/modules">
            <Button variant="outlined" onClick={() => handleSubmit()}>
              Commencer
            </Button>
          </Navigate>
        )}
        {modules.length > 0 && (
          <Navigate to="/result">
            <Button variant="outlined">Terminer</Button>
          </Navigate>
        )}
        {!navigate && (
          <Button variant="outlined" onClick={() => handleSubmit()}>
            Commencer
          </Button>
        )}
      </div>
      {error === true && <Error />}
    </div>
  );
}

export default Form;
