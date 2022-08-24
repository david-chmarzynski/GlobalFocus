import React, { useEffect, useState } from 'react'
import Select from 'react-select'

export default function QuestionTextSelector({options, addToReport, infoGen}) {
    const [choice, setChoice] = useState(null);

    useEffect(() => {
        if(choice) 
        {
            if(infoGen) addToReport(`{{global_${choice.value}_text}}`, `${choice.value} texte`);
            else addToReport(`{{question_${choice.value}_text}}`, `${choice.value} texte`);
            setChoice(null);
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [choice, addToReport])

    return(<Select 
        options={options} 
        placeholder = "Choisissez un intitulé de question" 
        className='qSelector'
        value={choice}
        onChange={setChoice}
    />)
} 