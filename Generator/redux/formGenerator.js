// VERSION 2.1 \\

// IMPORTS \\
const fs = require("fs");
const path = require("path");
const readline = require("readline-sync");

// DIRECTORIES \\
const base_tags = "base_tags";
const questions = "questions";
const chapters = "chapters";
const form = "form";
const modules = "modules";
const tags = "tags";

// PROMPT FILE NAME.JSON \\
const promptFileName = () => {
  let fileName = readline.question("Enter the file name : ");
  return fileName;
};

// CREATE DESTINATION FOLDER \\
const createDestFolder = () => {
  if (!fs.existsSync("./form_components")) {
    fs.mkdirSync("./form_components");
    copyMainPy();
  } else if (fs.existsSync("./form_components")) {
    copyMainPy();
  }
};

// COPY MAIN.PY IN DESTINATION FOLDER \\
const copyMainPy = () => {
  fs.copyFileSync("./main.py", "./form_components/main.py");
  console.log("main.py successfully copied.");
};

const dir = [base_tags, questions, chapters, form, modules, tags];
// DATAS FROM JSON FILE \\
const rawdata = fs.readFileSync(`./${promptFileName()}.json`);
const data = JSON.parse(rawdata);

// DELETE DIRECTORIES \\
const deleteExistingDirectories = () => {
  for (let i = 0; i < dir.length; i++) {
    if (fs.existsSync(`./form_components/${dir[i]}`)) {
      fs.rmdirSync(`./form_components/${dir[i]}`, { recursive: true }, () => {
        console.log(`${dir[i]} successfully deleted.`);
      });
    } else {
      console.log("No directory to delete.");
    }
  }
};

// CREATE DIRECTORIES \\
const createDirectory = (data) => {
  // DIRECTORY DOESN'T EXIST
  for (let i = 0; i < dir.length; i++) {
    if (!fs.existsSync(`./form_components/${dir[i]}`)) {
      // CREATE DIRECTORY
      fs.mkdirSync(
        path.join(__dirname, `./form_components/${dir[i]}`),
        (err) => {
          //__dirname corresponds to the full location url of ./
          if (err) {
            return console.error(err);
          }
          console.log(`Directory "${dir[i]}" successfully created`);
        }
      );
      // IF DIR ./form_components/CHAPTERS EXIST, CREATE FILE
      if (fs.existsSync("./form_components/chapters")) {
        createChapterFile(data);
      }
    }
    // DIRECTORY ALREADY EXIST
    else {
      console.log("This directory already exist");
    }
  }
};

// CREATE CHAPTERS \\
const createChapterFile = (data) => {
  let mods = [];
  for (let i = 0; i < data.modules.length; i++) {
    mods.push(data.modules[i].moduleOID);
  }
  let baseChapter = {
    oid: data.chapterOID,
    title: data.chapterTitle,
    modules: mods,
  };
  fs.writeFileSync(
    `./form_components/chapters/${data.chapterOID}.json`,
    JSON.stringify(baseChapter, "utf-8", 2)
  );
};

// CREATE TAGS \\
const createTags = (data) => {
  for (let i = 0; i < data.tags.length; i++) {
    let baseTag = {
      oid: data.tags[i].tagOID,
      title: data.tags[i].tagTitle,
      description: data.tags[i].tagDescription,
    };
    fs.writeFileSync(
      `./form_components/tags/${data.tags[i].tagOID}.json`,
      JSON.stringify(baseTag, "utf-8", 2)
    );
  }
};

// CREATE MODULES \\
const createModules = (data) => {
  for (let m = 0; m < data.modules.length; m++) {
    let baseMod = {};
    let isCalculationBool = false;
    data.modules[m].questions.forEach((question) => {
      if (question.isCalculation) {
        isCalculationBool = true;
      }
    });

    if (isCalculationBool) {
      baseMod = {
        oid: data.modules[m].moduleOID,
        title: data.modules[m].moduleTitle,
        questions: [],
        calculations: [],
      };
    } else {
      baseMod = {
        oid: data.modules[m].moduleOID,
        title: data.modules[m].moduleTitle,
        questions: [],
      };
    }

    for (let q = 0; q < data.modules[m].questions.length; q++) {
      let baseQuestion = {};
      if (
        data.modules[m].questions[q].isCalculation &&
        !data.modules[m].questions[q].isWithConditions
      ) {
        baseQuestion = {
          oid: data.modules[m].questions[q].questionOID,
          type: "NORMAL",
          isGlobal: true,
          calculationsWithConditions: {},
          title: data.modules[m].questions[q].questionOID,
          text: data.modules[m].questions[q].questionOID,
        };
        baseMod.calculations.push(baseQuestion);
      } else if (
        data.modules[m].questions[q].isCalculation &&
        data.modules[m].questions[q].isWithConditions
      ) {
        baseQuestion = {
          oid: data.modules[m].questions[q].questionOID,
          type: "WITH_CONDITIONS",
          isGlobal: true,
          calculation: "",
          title: data.modules[m].questions[q].questionOID,
          text: data.modules[m].questions[q].questionOID,
        };
        baseMod.calculations.push(baseQuestion);
      } else if (!data.modules[m].questions[q].isCalculation) {
        if (data.modules[m].questions[q].isTriggered === true) {
          baseQuestion = {
            question: data.modules[m].questions[q].questionOID,
            level: 1,
            isGlobal: data.modules[m].questions[q].isGlobal,
            trigger: {
              conditions: `!("${data.modules[m].questions[q].triggeredValue}" in ${data.modules[m].questions[q].triggeredQuestionOID})`,
              scope: "MODULE_SCOPE",
              defaultValuesMap: {
                [data.modules[m].questions[q]
                  .questionOID]: `${data.modules[m].questions[q].triggeredDefault}`,
              },
            },
          };
          baseMod.questions.push(baseQuestion);
        } else {
          baseQuestion = {
            question: data.modules[m].questions[q].questionOID,
            level: 1,
            isGlobal: data.modules[m].questions[q].isGlobal,
          };
          baseMod.questions.push(baseQuestion);
        }
      }
    }
    fs.writeFileSync(
      `./form_components/modules/${data.modules[m].moduleOID}.json`,
      JSON.stringify(baseMod, "utf-8", 2)
    );
  }
};

// CREATE QUESTIONS \\

const createQuestions = (data) => {
  for (let m = 0; m < data.modules.length; m++) {
    let baseQuestion = {};
    for (let q = 0; q < data.modules[m].questions.length; q++) {
      let baseChoices = [];
      let baseScores = [];
      baseQuestion = {
        oid: data.modules[m].questions[q].questionOID,
        title: data.modules[m].questions[q].questionText,
        text: data.modules[m].questions[q].questionText,
        type: data.modules[m].questions[q].type,
        choices: [],
        scores: [],
      };

      switch (data.modules[m].questions[q].type) {
        case "SINGLE_CHOICE":
          for (
            let a = 0;
            a < data.modules[m].questions[q].answers.length;
            a++
          ) {
            let choice = {
              code: `${a}`,
              text: `${data.modules[m].questions[q].answers[a].text}`,
            };
            let score = {
              conditions: `${data.modules[m].questions[q].questionOID} == "${a}"`,
              tagOID: `${data.modules[m].questions[q].tag}`,
              value: data.modules[m].questions[q].answers[a].value,
            };
            baseChoices.push(choice);
            baseScores.push(score);
          }
          baseQuestion.choices = baseChoices;
          baseQuestion.scores = baseScores;
          break;
        case "SINGLE_CHOICE_RADIO":
          for (
            let a = 0;
            a < data.modules[m].questions[q].answers.length;
            a++
          ) {
            let choice = {
              code: `${a}`,
              text: `${data.modules[m].questions[q].answers[a].text}`,
            };
            let score = {
              conditions: `${data.modules[m].questions[q].questionOID} == "${a}"`,
              tagOID: `${data.modules[m].questions[q].tag}`,
              value: data.modules[m].questions[q].answers[a].value,
            };
            baseChoices.push(choice);
            baseScores.push(score);
          }
          baseQuestion.choices = baseChoices;
          baseQuestion.scores = baseScores;
          break;
        case "MULTI_CHOICES":
          for (
            let a = 0;
            a < data.modules[m].questions[q].answers.length;
            a++
          ) {
            let choice = {
              code: `${a}`,
              text: `${data.modules[m].questions[q].answers[a].text}`,
            };
            let score = {
              conditions: `"${a}" in ${data.modules[m].questions[q].questionOID}`,
              tagOID: `${data.modules[m].questions[q].tag}`,
              value: data.modules[m].questions[q].answers[a].value,
            };
            let antiScore = {
              conditions: `!("${a}" in ${data.modules[m].questions[q].questionOID})`,
              tagOID: `${data.modules[m].questions[q].tag}`,
              value: "0",
            };
            baseChoices.push(choice);
            baseScores.push(score);
            baseScores.push(antiScore);
          }
          baseQuestion.choices = baseChoices;
          baseQuestion.scores = baseScores;
          break;
        case "DECIMAL":
          baseQuestion = {
            oid: data.modules[m].questions[q].questionOID,
            title: data.modules[m].questions[q].questionText,
            text: data.modules[m].questions[q].questionText,
            type: data.modules[m].questions[q].type,
            scale: {
              min: data.modules[m].questions[q].answers[0].min,
              max: data.modules[m].questions[q].answers[0].max,
              step: data.modules[m].questions[q].answers[0].step,
            },
            scores: [],
          };
          for (
            let val = 0;
            val < data.modules[m].questions[q].answers[0].max;
            val++
          ) {
            let score = {
              conditions: `${data.modules[m].questions[q].questionOID} == ${val}`,
              tagOID: `${data.modules[m].questions[q].tag}`,
              value: val,
            };
            baseScores.push(score);
            baseQuestion.scores = baseScores;
          }
          break;
        case "INTEGER":
          baseQuestion = {
            oid: data.modules[m].questions[q].questionOID,
            title: data.modules[m].questions[q].questionText,
            text: data.modules[m].questions[q].questionText,
            type: data.modules[m].questions[q].type,
            scale: {
              min: data.modules[m].questions[q].answers[0].min,
              max: data.modules[m].questions[q].answers[0].max,
              step: data.modules[m].questions[q].answers[0].step,
            },
            scores: [],
          };
          for (
            let val = 0;
            val < data.modules[m].questions[q].answers[0].max;
            val++
          ) {
            let score = {
              conditions: `${data.modules[m].questions[q].questionOID} == ${val}`,
              tagOID: `${data.modules[m].questions[q].tag}`,
              value: val,
            };
            baseScores.push(score);
            baseQuestion.scores = baseScores;
          }
          break;
        case "ANALOG_SCALE":
          baseQuestion = {
            oid: data.modules[m].questions[q].questionOID,
            title: data.modules[m].questions[q].questionText,
            text: data.modules[m].questions[q].questionText,
            type: data.modules[m].questions[q].type,
            scale: {
              min: data.modules[m].questions[q].answers[0].min,
              max: data.modules[m].questions[q].answers[0].max,
              step: data.modules[m].questions[q].answers[0].step,
            },
            scores: [],
          };
          for (
            let val = 0;
            val < data.modules[m].questions[q].answers[0].max;
            val++
          ) {
            let score = {
              conditions: `${data.modules[m].questions[q].questionOID} == ${val}`,
              tagOID: `${data.modules[m].questions[q].answers[0].tag}`,
              value: val,
            };
            baseScores.push(score);
            baseQuestion.scores = baseScores;
          }
          break;
        case "DIGITAL_SCALE":
          baseQuestion = {
            oid: data.modules[m].questions[q].questionOID,
            title: data.modules[m].questions[q].questionText,
            text: data.modules[m].questions[q].questionText,
            type: data.modules[m].questions[q].type,
            scale: {
              min: data.modules[m].questions[q].answers[0].min,
              max: data.modules[m].questions[q].answers[0].max,
              step: data.modules[m].questions[q].answers[0].step,
            },
            scores: [],
          };
          for (
            let val = 0;
            val < data.modules[m].questions[q].answers[0].max;
            val++
          ) {
            let score = {
              conditions: `${data.modules[m].questions[q].questionOID} == ${val}`,
              tagOID: `${data.modules[m].questions[q].tag}`,
              value: val,
            };
            baseScores.push(score);
            baseQuestion.scores = baseScores;
          }
          break;
        case "TEXT":
          break;
        default:
          break;
      }
      fs.writeFileSync(
        `./form_components/questions/${data.modules[m].questions[q].questionOID}.json`,
        JSON.stringify(baseQuestion, "utf-8", 2)
      );
    }
  }
};

// CREATE FORM \\
const createForm = (data) => {
  let baseForm = {};
  let childrenList = [];
  for (let f = 0; f < data.form.length; f++) {
    // 1. Boucle sur FORM
    // BOUCLE CHAPITRES
    // 2. FORMATION DE L'OBJET BASEFORM
    baseForm = {
      oid: `${data.form[f].formOID}`,
      title: `${data.form[f].formTitle}`,
      estimatedTime: data.estimatedTime,
      pricing: data.pricing,
      description: `${data.form[f].formDescription}`,
      levelMax: `${data.levelMax}`,
      linkedForm: `${data.linkedForm}`,
      companyId: `${data.companyId}`,
      authors: data.authors,
      chapters: [data.chapterOID],
      professions: data.professions,
      diagnostics: [],
      reportingTrees: [],
    };
    // 3. Boucle sur TAGS
    for (let m = 0; m < data.modules.length; m++) {
      for (let t = 0; t < data.tags.length; t++) {
        if (data.tags[t].module === data.modules[m].moduleOID) {
          if (data.tags[t].parent && data.tags[t].parent.length > 0) {
            // CASE CHILD, PUSH IN CHILDREN
            childrenList.push(data.tags[t]);
          } else {
            // CASE IS A PARENT
            let ranges = [];
            if (data.tags[t].tagType === "SCORE") {
              ranges = createRanges(data.tags[t], ranges);
            }

            let mother = {
              category: data.category,
              scoreStrategy: data.scoreStrategy,
              reportingNode: {
                tagOID: data.tags[t].tagOID,
                type: data.tags[t].tagType,
                ranges: ranges,
                children: [],
              },
            };
            // PUSH IN REPORTING TREE
            baseForm.reportingTrees.push(mother);
          }
        }
      }
      createChildren(childrenList, baseForm);
      fs.writeFileSync(
        `./form_components/form/${data.form[f].formOID}.json`,
        JSON.stringify(baseForm, "utf-8", 2)
      );
    }
  }
};

// ITERATION IN NODES \\
function searchReportingNode(element, matchingTagName) {
  if (element.tagOID == matchingTagName) {
    return element;
  } else if (element.children != null) {
    let result = null;
    for (let i = 0; result == null && i < element.children.length; i++) {
      result = searchReportingNode(element.children[i], matchingTagName);
    }
    return result;
  }
  return null;
}

// CREATE CHILDREN \\
const createChildren = (childrenList, baseForm) => {
  while (childrenList.length > 0) {
    for (let childIndex = 0; childIndex < childrenList.length; childIndex++) {
      let parentNode;
      baseForm.reportingTrees.forEach((tree) => {
        parentNode = searchReportingNode(
          tree.reportingNode,
          `${childrenList[childIndex].parent}`
        );
        if (parentNode == null || parentNode == undefined) {
          //do nothing
        } else {
          let ranges = [];
          if (childrenList[childIndex].tagType === "SCORE") {
            ranges = createRanges(childrenList[childIndex], ranges);
          }
          let child = {
            tagOID: `${childrenList[childIndex].tagOID}`,
            type: childrenList[childIndex].tagType,
            ranges: ranges,
            children: [],
          };
          parentNode.children.push(child);
          childrenList.splice(childIndex, 1);
          childIndex--; // je retire 1, car slice décale le reste du tableau (de la droite) vers la gauche
        }
      });
    }
  }
};

// CREATE RANGES \\
const createRanges = (child, ranges) => {
  if (child.rangeMin.length === 2) {
    let range1 = {
      min: child.rangeMin[0],
      max: child.rangeMax[0],
      color: "00FF00",
    };
    let range2 = {
      min: child.rangeMin[1],
      max: child.rangeMin[1],
      color: "FF0000",
    };
    ranges.push(range1, range2);
  } else if (child.rangeMin.length === 4) {
    let range1 = {
      min: child.rangeMin[0],
      max: child.rangeMax[0],
      color: "00FF00",
    };
    let range2 = {
      min: child.rangeMin[1],
      max: child.rangeMax[1],
      color: "FFFF00",
    };
    let range3 = {
      min: child.rangeMin[2],
      max: child.rangeMax[2],
      color: "FF9900",
    };
    let range4 = {
      min: child.rangeMin[3],
      max: child.rangeMax[3],
      color: "FF0000",
    };
    ranges.push(range1, range2, range3, range4);
  } else if (child.rangeMin.length === 6) {
    let range1 = {
      min: child.rangeMin[0],
      max: child.rangeMax[0],
      color: "00FF00",
    };
    let range2 = {
      min: child.rangeMin[1],
      max: child.rangeMax[1],
      color: "CCFF33",
    };
    let range3 = {
      min: child.rangeMin[2],
      max: child.rangeMax[2],
      color: "FFFF00",
    };
    let range4 = {
      min: child.rangeMin[3],
      max: child.rangeMax[3],
      color: "FF9900",
    };
    let range5 = {
      min: child.rangeMin[4],
      max: child.rangeMax[4],
      color: "FF0000",
    };
    let range6 = {
      min: child.rangeMin[5],
      max: child.rangeMax[5],
      color: "990000",
    };

    ranges.push(range1, range2, range3, range4, range5, range6);
  }
  return ranges;
};

const script = () => {
  console.log("===STARTING SCRIPT===");
  createDestFolder();
  deleteExistingDirectories();
  createDirectory(data);
  createTags(data);
  createModules(data);
  createQuestions(data);
  createForm(data);
  console.log("===ENDING   SCRIPT===");
};

script();
