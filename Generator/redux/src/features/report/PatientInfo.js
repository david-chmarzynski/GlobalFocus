import React, { useEffect, useState } from 'react'
import Select from 'react-select'

export default function QuestionTextSelector({addToReport}) {
    const [choice, setChoice] = useState(null);

    let options = [
        {value: "patient_firstname" , label: "Prénom"},
        {value: "patient_lastname" , label: "Nom"},
        {value: "patient_dateofbirth" , label: "Date de naissance"},
        {value: "patient_gender" , label: "Genre"},
        {value: "patient_age" , label: "Age"},
    ]
    useEffect(() => {
        if(choice) 
        {
            addToReport(`{{${choice.value}}}`, `${choice.label}`);
            setChoice(null);
        }
    }, [choice, addToReport])

    return(<Select 
        options={options} 
        placeholder = "Infos personnelles patient" 
        className='qSelector'
        value={choice}
        onChange={setChoice}
    />)
} 