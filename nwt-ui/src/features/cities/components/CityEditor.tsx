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
import {EditorType} from "common/types/editorType";

export interface CityEditorProps {
    city: City
    title: string
    editorOpen: boolean
    editorType: EditorType
    actions: {
        onCancel: () => void
        onSubmit: (data: CityFormData) => void
        onClose: () => void
    }
}

export interface CityFormData {
    name: string
    details: string
}

const CityEditor = ({
                        city,
                        title,
                        editorOpen,
                        actions,
                    }: CityEditorProps) => {
    const initialValues: CityFormData = {name: city.name, details: city.details}
    const {handleSubmit, control, reset} = useForm<CityFormData>({
        defaultValues: initialValues
    })

    useEffect(() => {
        reset(initialValues)
    }, [city])

    const {onCancel, onSubmit} = actions

    return (
        <Dialog open={editorOpen} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <form>
                <DialogContent>
                    <DialogContentText>
                        {messages.cityEditor.insert.description}
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
                    <Button onClick={handleSubmit(onSubmit)}>{messages.common.saveButton}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default CityEditor