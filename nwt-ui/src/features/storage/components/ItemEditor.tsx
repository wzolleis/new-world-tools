import {ItemActionHandler} from "features/cities/components/CitiesView";
import {Item} from "common/types/commonTypes";
import {Controller, useForm} from "react-hook-form";
import React, {useEffect} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import {messages} from "common/i18n/messages";
import {Dialog, DialogContent} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";

interface CityItemEditorProps {
    item: Item
    title: string
    editorOpen: boolean
    actionHandler: ItemActionHandler
}

export interface ItemFormData {
    name: string
    quantity: number
}

const ItemEditor = ({item, title, actionHandler: {onCancel, onSubmit}, editorOpen}: CityItemEditorProps) => {
    const emptyFormValues: ItemFormData = {name: '', quantity: 0}
    const initialValues: ItemFormData = item ? {name: item.name, quantity: item.quantity} : emptyFormValues
    const {handleSubmit, control, reset} = useForm<ItemFormData>({
        defaultValues: initialValues
    })
    useEffect(() => {
        reset(initialValues)
    }, [item])

    const onFormSubmit = (values: ItemFormData) => {
        reset(emptyFormValues)
        onSubmit(values)
    }

    return (
        <Dialog open={editorOpen} onClose={onCancel}>
            <DialogTitle>{title}</DialogTitle>
            <form>
                <DialogContent>
                    <DialogContentText>
                        {messages.itemEditor.create.description}
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
                                label={messages.itemEditor.fields.name}
                                type="text"
                                fullWidth
                                variant="standard"
                                required={true}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="quantity"
                        render={({field: {onChange, value}}) => (
                            <TextField
                                onChange={onChange}
                                value={value}
                                autoFocus
                                margin="dense"
                                id="quantity"
                                label={messages.itemEditor.fields.quantity}
                                type="number"
                                fullWidth
                                variant="standard"
                                required={true}
                            />
                        )}
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

export default ItemEditor