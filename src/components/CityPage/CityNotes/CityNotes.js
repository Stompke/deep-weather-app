import React, { useState } from 'react';

// Components & Styles
import { FaEdit, FaCheck, FaTrash } from "react-icons/fa";
import { Title, NotesContainer, TitleContainer, InputContainer } from './CityNotesStyles';

const CityNotes = props => {

    const [ notes, setNotes ] = useState(props.cityData.notes)
    const [ editing, setEditing ] = useState(false)

    const editHandler = () => {
        setEditing(!editing)

        // Set Local Storage
        localStorage.setItem(props.cityData.location.name, 
            JSON.stringify(
                {
                    ...props.cityData,
                    notes: notes
                }
            ))

        // Set state  
        props.setCityData({
            ...props.cityData,
            notes: notes
        })

    }

    const deleteNotes = () => {
        setNotes('')
    }

    const onChangeHandler = e => {
        setNotes(e.target.value)
    }


    return (
        <>
        <NotesContainer>
            
            <TitleContainer>
                <Title>Notes: </Title>
                {editing ? <><FaCheck onClick={editHandler} /><FaTrash onClick={deleteNotes} /></> : <FaEdit onClick={editHandler}/>}
            </TitleContainer>

            <InputContainer>
                {editing ? <input onChange={onChangeHandler} value={notes}/> : <p>{props.cityData.notes}</p> }
            </InputContainer>
            

        </NotesContainer>
    
        </>
    )
}

export default CityNotes;