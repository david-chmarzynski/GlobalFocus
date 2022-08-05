import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function EndIfQuestion({addToReport, ifStatements, setIfStatements}) {

    const [lastIfStatement, setLastIfStatement] = useState(false)
    
    useEffect(() => {
        let ifStatementsList = [...ifStatements];
        setLastIfStatement(ifStatementsList.at(-1))
    }, [ifStatements])
    
    function handleAdd(){
        let ifStatementsList = [...ifStatements];    
        addToReport(
            `{{/global_${lastIfStatement.oid}_answer}}`, `] Fin si (${lastIfStatement.oid})`, false
        );
        ifStatementsList.pop()
        setIfStatements(ifStatementsList);
        setLastIfStatement(ifStatementsList.at(-1))
    }

    if (lastIfStatement && lastIfStatement != undefined) {
        return(
            <Button 
                className='breakLine'
                variant="outlined"
                color="primary"
                onClick={() => handleAdd()}
            >
                Fin si {lastIfStatement && lastIfStatement.oid}
            </Button>
        )
    } else {
        return (
            <Button 
                className='breakLine'
                variant="outlined"
                color="primary"
                disabled
            >
                Fin si
            </Button>
        )
    }
} 