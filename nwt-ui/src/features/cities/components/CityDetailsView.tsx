import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import {City, CityStorage, Item, Undefined} from "common/types/commonTypes";
import React, {useState} from "react";
import {messages} from "common/i18n/messages";
import ItemTable from "features/storage/components/ItemTable";
import {ItemActionHandler} from "features/cities/components/CitiesView";
import ItemEditor, {ItemFormData} from "features/storage/components/ItemEditor";
import {v4 as uuidv4} from "uuid";
import Box from "@mui/material/Box";
import AppBarAction from "common/appbar/AppBarAction";

export interface CityDetailsViewProps {
    city: City | undefined
    storage: CityStorage
}

interface ItemEditorParam {
    item: Item
    title: string
}

const newItem: Item = {
    category: 'resource',
    attributes: {},
    quantity: 0,
    name: '',
    key: uuidv4()
}

const itemEditorParamNew: ItemEditorParam = {
    item: newItem, title: messages.itemEditor.create.title
}


const CityDetailsView = ({city, storage}: CityDetailsViewProps) => {
    const [itemEditorVisible, setItemEditorVisible] = useState(false);
    const [itemEditorParam, setItemEditorParam] = useState<ItemEditorParam>(itemEditorParamNew)
    // const actionHandler = useContext(ItemActionContext)
    if (!city) return null

    const itemActionCallbacks: ItemActionHandler = {
        onAddItem: () => {
            console.log('TODO: add item')
            setItemEditorVisible(true)
        },
        onEditItem: () => {
            console.log('edit item')
        },
        onDeleteItem: () => {
            console.log('delete item')
        },
        onCancel: () => {
            setItemEditorVisible(false)
        },
        onSubmit: (values: ItemFormData) => {
            setItemEditorVisible(false)
        },
        onSelect: (item: Undefined<Item>) => {
            console.log('item selected', item)
        }
    }

    return (
        <div>
            <Grid container direction="column" spacing={2}>
                <Grid item xs={6} sm={6}>
                    <Typography variant="h6" align="left" margin="dense">
                        {messages.citiesItemsTable.lager}
                    </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                    <ItemTable storage={storage} city={city} actionHandler={itemActionCallbacks}/>
                </Grid>
            </Grid>

            <ItemEditor item={itemEditorParam.item} title={itemEditorParam.title} editorOpen={itemEditorVisible}
                        actionHandler={itemActionCallbacks}/>

            <AppBar position="fixed" sx={{top: 'auto', bottom: 0}} color='primary'>
                <Toolbar>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexGrow: 1}}>
                        <AppBarAction label={messages.citiesItemsTable.actions.add} icon={"Storage"}
                                      callback={itemActionCallbacks.onAddItem}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default CityDetailsView