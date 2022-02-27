import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {City} from "common/types/commonTypes";
import {Controller, useForm} from "react-hook-form";
import {messages} from "common/i18n/messages";
import {CityActionHandler} from "features/cities/components/CitiesView";

export interface CityEditorProps {
    city: City
    title: string
    editorOpen: boolean
    actionHandler: CityActionHandler
}

export interface CityFormData {
    name: string
    details: string
}

const CityEditor = ({city, title, actionHandler: {onSubmit, onCancel}, editorOpen}: CityEditorProps) => {
    const emptyFormValues: CityFormData = {name: '', details: ''}
    const initialValues: CityFormData = city ? {name: city.name, details: city.details} : emptyFormValues
    const {handleSubmit, control, reset} = useForm<CityFormData>({
        defaultValues: initialValues
    })

    useEffect(() => {
        reset(initialValues)
    }, [city])

    // ({
    //     field: {onChange, onBlur, value, name, ref},
    //     fieldState: {invalid, isTouched, isDirty, error},
    //     formState,
    // }

    const onFormSubmit = (values: CityFormData) => {
        reset(emptyFormValues)
        onSubmit(values)
    }

    return (
        <Dialog open={editorOpen} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <form>
                <DialogContent>
                    <DialogContentText>
                        {messages.cityEditor.create.description}
                    </DialogContentText>
                    <Controller
                        control={control}
                        name="name"
                        render={({field: {onChange, value}}) => (
                            <TextField
                                onChange={onChange}
                                value={value}
                                autoFocus
                                margin="dense"
                                id="name"
                                label={messages.cityEditor.fields.name}
                                type="text"
                                fullWidth
                                variant="standard"
                                required={true}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="details"
                        render={({field: {onChange, value}}) => (
                            <TextField
                                onChange={onChange}
                                value={value}
                                margin="dense"
                                id="details"
                                label={messages.cityEditor.fields.details}
                                type="text"
                                fullWidth
                                variant="standard"
                            />)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel}>{messages.common.cancelButton}</Button>
                    <Button onClick={handleSubmit(onFormSubmit)}>{messages.common.saveButton}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default CityEditor