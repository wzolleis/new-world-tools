import React from 'react';
import {City} from "common/types/commonTypes";
import {Controller, SubmitHandler, useForm} from "react-hook-form";

interface CityEditorProps {
    city: City
    onSave: (city: City) => void
    handleClose: () => void
    editorOpen: boolean
}

interface CityFormData {
    details: string
}

const  CityEditor = ({city, onSave, handleClose, editorOpen}: CityEditorProps) => {
    const {handleSubmit, control, getValues} = useForm<CityFormData>({
        defaultValues: {

        }
    })
    return (
        <div></div>
    )
}

export default CityEditor