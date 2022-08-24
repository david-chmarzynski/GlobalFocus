import React, { useEffect, useState } from 'react'
import Select from 'react-select'

export default function MultiChoiceAnswerSelector({options, addToReport, infoGen}) {
    const [choice, setChoice] = useState(null);

    useEffect(() => {
        if(choice) 
        {
            if(infoGen) addToReport(`{{#global_${choice.value}_answer}}<ul> <li>{{.}}</li> </ul>{{/global_${choice.value}_answer}}`, `${choice.value} réponse`);
            else addToReport(`{{#question_${choice.value}_answer}}<ul> <li>{{.}}</li> </ul>{{/question_${choice.value}_answer}}`, `${choice.value} réponse`);
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