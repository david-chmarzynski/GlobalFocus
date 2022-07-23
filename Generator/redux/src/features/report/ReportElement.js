import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete'
import ArrowBack from '@mui/icons-material/ArrowBack'
import ArrowForward from '@mui/icons-material/ArrowForward'

import './Report.css'

export default function ReportElement({element, report, setReport}){

    function getElementIndex(elementId) {
        return [...report].findIndex(element => {
            return element.id === elementId;
        });
    }

    function moveElementLeft(elementId){
        let elements = [...report];
        let elementIndex = getElementIndex(elementId)
        
        if(elementIndex > 0){
          let elementToMove = elements[elementIndex];
          elements[elementIndex] = elements[elementIndex - 1];
          elements[elementIndex - 1] = elementToMove;
          setReport(elements);
        }
    }

    function moveElementRight(elementId){
        let elements = [...report];
        let elementIndex = getElementIndex(elementId)

        if(elementIndex < elements.length -1){
            let elementToMove = elements[elementIndex];
            elements[elementIndex] = elements[elementIndex + 1];
            elements[elementIndex + 1] = elementToMove;
            setReport(elements);
        }
    }

    function deleteElement(elementId){
        let elements = [...report];
        let elementIndex = getElementIndex(elementId)

        elements.splice(elementIndex, 1);
        setReport(elements);
    }

    return(
        <div className="reportElement">

            <span>{element.display}</span>

            <div className="reportElementButtons">
                <IconButton color="primary" aria-label="left-arrow" onClick={ () => {
                    moveElementLeft(element.id);
                }}>
                    <ArrowBack/>
                </IconButton>

                <IconButton color="error" aria-label="delete" onClick={ () => {
                    deleteElement(element.id);
                }}>
                    <Delete/>
                </IconButton>

                <IconButton color="primary" aria-label="right-arrow" onClick={ () => {
                    moveElementRight(element.id);
                }}>
                    <ArrowForward/>
                </IconButton>
            </div>

        </div>
    )
}