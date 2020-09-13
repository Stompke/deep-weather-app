import React, { useState } from 'react';


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

    const onChangeHandler = e => {
        setNotes(e.target.value)
    }


    return (
        <>
            <h3>Notes: </h3>
    <button onClick={editHandler}>{editing ? "save" : "edit"}</button>
    {editing ? <input onChange={onChangeHandler} value={notes}/> : <p>{props.cityData.notes}</p> }
    
        </>
    )
}

export default CityNotes;