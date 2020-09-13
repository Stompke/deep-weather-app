import React, { useState } from 'react';

const CityNotes = props => {

    const [ notes, setNotes ] = useState(props.cityData.notes)
    const [ editing, setEditing ] = useState(true)

    const editHandler = () => {
        setEditing(!editing)
        props.setCityData({
            ...props.cityData,
            notes: notes
        })
    }

    const onChangeHandler = e => {
        setNotes(e.target.value)
    }

    // console.log(cityData)

    return (
        <>
            <h3>Notes: </h3>
    <button onClick={editHandler}>{editing ? "save" : "edit"}</button>
    {editing ? <input onChange={onChangeHandler} value={notes}/> : <p>{props.cityData.notes}</p> }
    
        </>
    )
}

export default CityNotes;