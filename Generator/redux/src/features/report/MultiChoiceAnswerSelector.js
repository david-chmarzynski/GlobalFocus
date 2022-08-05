import React, { useEffect, useState } from 'react'
import Select from 'react-select'

export default function MultiChoiceAnswerSelector({options, addToReport}) {
    const [choice, setChoice] = useState(null);

    useEffect(() => {
        if(choice) 
        {
            addToReport(`{{#global_${choice.value}_answer}}<ul> <li>{{.}}</li> </ul>{{/global_${choice.value}_answer}}`, `${choice.value} réponse`);
            setChoice(null);
        }
    }, [choice, addToReport])

    return(<Select 
        options={options} 
        placeholder = "Reponse d'une question MULTI CHOICES" 
        className='qSelector'
        value={choice}
        onChange={setChoice}
    />)
} 