import React, { useEffect, useState } from 'react'
import Select from 'react-select'

export default function SingleChoiceAnswerSelector({options, addToReport}) {
    const [choice, setChoice] = useState(null);

    useEffect(() => {
        if(choice) 
        {
            addToReport(`{{global_${choice.value}_answer}}`, `${choice.value} réponse`);
            setChoice(null);
        }
    }, [choice, addToReport])

    return(<Select 
        options={options} 
        placeholder = "Reponse d'une question SINGLE CHOICE" 
        className='qSelector'
        value={choice}
        onChange={setChoice}
    />)
} 