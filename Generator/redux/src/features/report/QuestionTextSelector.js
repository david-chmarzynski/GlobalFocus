import React, { useEffect, useState } from 'react'
import Select from 'react-select'

export default function QuestionTextSelector({options, addToReport}) {
    const [choice, setChoice] = useState(null);

    useEffect(() => {
        if(choice) 
        {
            addToReport(`{{general_${choice.value}_text}}`, `${choice.value} texte`);
            setChoice(null);
        }
    }, [choice, addToReport])

    return(<Select 
        options={options} 
        placeholder = "Choisissez un intitulé de question" 
        className='qSelector'
        value={choice}
        onChange={setChoice}
    />)
} 