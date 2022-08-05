import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ArrowForward from '@mui/icons-material/ArrowForward'
import FormatItalic from '@mui/icons-material/FormatItalic'
import FormatBold from '@mui/icons-material/FormatBold'
import Title from '@mui/icons-material/Title'

import './Report.css'
import { Badge } from '@mui/material';
import { useEffect, useState } from 'react';

export default function ReportElement({element, report, setReport, ifStatements, setIfStatements}){

    const [italics, setItalics] = useState(element.italics);
    const [bold, setBold] = useState(element.bold);
    const [title, setTitle] = useState(element.title);

    useEffect(()=>{
        let elements = [...report];
        let elementIndex = getElementIndex(elements, element.id);
        
        if(elements[elementIndex].italics != italics || elements[elementIndex].bold != bold || [elementIndex].title != title ){
            elements[elementIndex].italics = italics;
            elements[elementIndex].bold = bold;
            elements[elementIndex].title = title;
        }
        setReport(elements);

    }, [italics, bold, title])

    function getElementIndex(list, elementId) {
        return list.findIndex(element => {
            return element.id === elementId;
        });
    }

    function moveElementLeft(elementId){
        let elements = [...report];
        let elementIndex = getElementIndex(elements, elementId)
        
        if(elementIndex > 0){
          let elementToMove = elements[elementIndex];
          elements[elementIndex] = elements[elementIndex - 1];
          elements[elementIndex - 1] = elementToMove;
          setReport(elements);
        }
    }

    function moveElementRight(elementId){
        let elements = [...report];
        let elementIndex = getElementIndex(elements, elementId)

        if(elementIndex < elements.length -1){
            let elementToMove = elements[elementIndex];
            elements[elementIndex] = elements[elementIndex + 1];
            elements[elementIndex + 1] = elementToMove;
            setReport(elements);
        }
    }

    function deleteElement(elementId, isIfStatement){
        let elements = [...report];
        let elementIndex = getElementIndex(elements, elementId)

        elements.splice(elementIndex, 1);
        setReport(elements);

        if(isIfStatement) {
            let ifStatementsList = [...ifStatements];
            let ifStatementIndex = getElementIndex(ifStatementsList, elementId);
            ifStatementsList.splice(ifStatementIndex, 1);
            setIfStatements(ifStatementsList);
        }
    }

    return(
        <div className="reportElement">

            <span className="reportElementContent">
                {
                    (italics)
                        ? <em>
                           {(bold)
                            ? <strong>{element.display}</strong> : <>{element.display}</> }
                        </em>
                        : (bold)
                            ? <strong>{element.display}</strong> : <>{element.display}</>
                }
            </span>

            <div className="reportElementButtons">
                <div>
                    <IconButton color="primary" aria-label="Move left" onClick={ () => {
                        moveElementLeft(element.id);
                    }}>
                        <ArrowBack/>
                    </IconButton>

                    <IconButton color="error" aria-label="Delete element" onClick={ () => {
                        deleteElement(element.id, element.ifStatement);
                    }}>
                        <Delete/>
                    </IconButton>

                    <IconButton color="primary" aria-label="Move right" onClick={ () => {
                        moveElementRight(element.id);
                    }}>
                        <ArrowForward/>
                    </IconButton>
                </div>
                <div>
                    <IconButton color={italics ? "warning" : "primary"} aria-label="left-arrow" onClick={ () => {
                        setItalics(!italics);
                    }}>
                        <FormatItalic/>
                    </IconButton>

                    <IconButton color={bold ? "warning" : "primary"} aria-label="delete" onClick={ () => {
                        setBold(!bold);
                    }}>
                        <FormatBold/>
                    </IconButton>


                    <IconButton color={title>0 ? "warning" : "primary"} aria-label="title" onClick={ () => {
                        setTitle((title+1)%5);
                    }}>
                        <Badge badgeContent={title} color="error" sx={{opacity:1}}>
                            <Title/>
                        </Badge>
                        
                    </IconButton>
                </div>
            </div>

        </div>
    )
}