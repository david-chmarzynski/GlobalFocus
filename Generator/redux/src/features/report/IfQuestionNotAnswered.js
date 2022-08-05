import React, { useEffect, useState } from 'react'
import Select from 'react-select'

export default function IfQuestionNotAnswered({options, addToReport, addIfStatement}) {
    const [choice, setChoice] = useState(null);

    useEffect(() => {
        if(choice) 
        {
            addIfStatement(choice.value).then(() => 
                addToReport(`{{^global_${choice.value}_answer}}`, `Si NON ${choice.value} [`, false, true));
            setChoice(null);
        }
    }, [choice, addToReport])

    return(<Select 
        options={options} 
        placeholder = "Si question NON répondue" 
        className='qSelector'
        value={choice}
        onChange={setChoice}
    />)
} 