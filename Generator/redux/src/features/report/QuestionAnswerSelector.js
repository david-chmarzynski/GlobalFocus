import React, { useEffect, useState } from 'react'
import Select from 'react-select'

export default function QuestionAnswerSelector({options, addToReport}) {
    const [choice, setChoice] = useState(null);

    useEffect(() => {
        if(choice) 
        {
            addToReport(`{{general_${choice.value}_answer}}`, `${choice.value} réponse`);
            setChoice(null);
        }
    }, [choice, addToReport])

    return(<Select 
        options={options} 
        placeholder = "Choisissez une réponse de question" 
        className='qSelector'
        value={choice}
        onChange={setChoice}
    />)
} 