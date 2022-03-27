import {Controller, useForm} from "react-hook-form";
import React, {useEffect} from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import {messages} from "common/i18n/messages";
import {Dialog, DialogContent} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import {Item} from "common/types/commonTypes";
import {EditorType} from "common/types/editorType";
import {ItemActionHandler} from "features/storage/actions/ItemActionHandler";

interface CityItemEditorProps {
    title: string
    editorOpen: boolean
    item: Item
    editorType: EditorType
    itemActionHandler: ItemActionHandler
}

export interface ItemFormData {
    name: string
    quantity: number
}

const ItemEditor = ({
                        title,
                        item,
                        editorOpen,
                        editorType,
                        itemActionHandler: {onClose, onInsert, onUpdate, onCancel}
                    }: CityItemEditorProps) => {
    const emptyFormValues: ItemFormData = {name: '', quantity: 0}
    const initialValues: ItemFormData = {name: item.name, quantity: item.quantity}
    const {handleSubmit, control, reset} = useForm<ItemFormData>({
        defaultValues: initialValues
    })
    useEffect(() => {
        reset(initialValues)
    }, [item])

    const onFormSubmit = (values: ItemFormData) => {
        reset(emptyFormValues)
        const toSubmit = {
            ...item,
            ...values
        }
        if (editorType === 'insert') {
            onInsert(toSubmit)
        } else if (editorType === 'edit') {
            onUpdate(toSubmit)
        }
        onClose()
    }

    const onFormCancel = () => {
        onCancel()
    }

    return (
        <Dialog open={editorOpen} onClose={onFormCancel}>
            <DialogTitle>{title}</DialogTitle>
            <form>
                <DialogContent>
                    <DialogContentText>
                        {messages.itemEditor.insert.description}
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
                    <Button onClick={onFormCancel}>{messages.common.cancelButton}</Button>
                    <Button onClick={handleSubmit(onFormSubmit)}>{messages.common.saveButton}</Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default ItemEditor