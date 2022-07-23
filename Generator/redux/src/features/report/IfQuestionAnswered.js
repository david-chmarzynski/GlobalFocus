import React, { useEffect, useState } from 'react'
import Select from 'react-select'

export default function IfQuestionAnswered({options, addToReport}) {
    const [choice, setChoice] = useState(null);

    useEffect(() => {
        if(choice) 
        {
            addToReport(`{{#${choice.value}}}`, `Si ${choice.value}`);
            setChoice(null);
        }
    }, [choice, addToReport])

    return(<Select 
        options={options} 
        placeholder = "Si question répondue" 
        className='qSelector'
        value={choice}
        onChange={setChoice}
    />)
} 