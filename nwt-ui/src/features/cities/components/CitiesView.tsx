import React, {createContext, useState} from "react";
import {AppBar, Grid, Toolbar} from "@mui/material";
import {CitiesTable} from "features/cities/components/CitiesTable";
import CityDetailsView from "features/cities/components/CityDetailsView";
import {City, CityStorage, Item, Undefined} from "common/types/commonTypes";
import TopAppBar from "common/components/TopAppBar";
import {messages} from "common/i18n/messages";
import {useAppDispatch, useAppSelector} from "app/state/hooks";
import {insertCity, selectCity, updateCity} from "features/cities/state/citiesSlice";
import AppBarTitle from "common/components/AppBarTitle";
import {emptyStorage, selectStorage, updateStorage} from "features/storage/state/storageSlice";
import AppBarAction from "common/appbar/AppBarAction";
import Box from "@mui/material/Box";
import CityEditor, {CityFormData} from "features/cities/components/CityEditor";
import {v4 as uuidv4} from 'uuid';
import {ItemActionHandler} from "features/storage/actions/ItemActionHandler";
import ItemEditor from "features/storage/components/ItemEditor";
import {EditorType} from "common/types/editorType";
import ItemAppBarAction from "features/storage/actions/ItemAppBarAction";
import {insert, update} from "utils/arrayUtils";

interface CityEditorParam {
    city: City
    title: string
}

const newCity: City = {
    name: '', details: '', key: uuidv4(), player: '', world: ''
}

const cityEditorParamNew: CityEditorParam = {
    city: newCity, title: messages.cityEditor.create.title
}

export interface CityActionHandler {
    onInsert: () => void
    onEditCity: () => void
    onSubmit: (values: CityFormData) => void
    onCancel: () => void
    onDeleteCity: () => void
    onSelect: (city: Undefined<City>) => void
}

interface ItemEditorParam {
    item: Item
    editorType: EditorType
}

export const ItemActionContext = createContext<ItemActionHandler>(ItemActionHandler.createInstance())

const CitiesView = () => {
    const [selectedCity, setSelectedCity] = useState<Undefined<City>>(undefined)
    const {cities} = useAppSelector(selectCity)
    const {storages} = useAppSelector(selectStorage)
    const dispatch = useAppDispatch()
    const cityStorage: CityStorage = storages.find(storage => storage.city === selectedCity?.key) || emptyStorage
    const [cityEditorVisible, setCityEditorVisible] = useState(false);
    const [cityEditorParam, setCityEditorParam] = useState<CityEditorParam>(cityEditorParamNew)
    const [itemEditorVisible, setItemEditorVisible] = useState(false);
    const [itemEditorParam, setItemEditorParam] = useState<ItemEditorParam>({
        item: ItemActionHandler.createNewItem(),
        editorType: 'edit'
    })
    const cityActionCallbacks: CityActionHandler = {
        onInsert: () => {
            setCityEditorParam({
                ...cityEditorParam,
                city: newCity,
                title: messages.cityEditor.create.title
            })
            setCityEditorVisible(true)
        },
        onEditCity: () => {
            setCityEditorParam({
                ...cityEditorParam,
                city: selectedCity || newCity,
                title: messages.cityEditor.edit.title
            })
            setCityEditorVisible(true)
        },
        onSubmit: (values: CityFormData) => {
            setCityEditorVisible(false)
            const toUpdate = {
                ...cityEditorParam.city,
                ...values
            }
            const cityExists = cities.findIndex(city => city.key === toUpdate.key) >= 0
            if (cityExists)
                dispatch(updateCity(toUpdate))
            else
                dispatch(insertCity(toUpdate))
        },
        onCancel: () => {
            setCityEditorVisible(false)
        },
        onDeleteCity: () => {
            // TODO
            console.log('TODO: delete city:', selectedCity)
        },
        onSelect: (city: Undefined<City>) => {
            setSelectedCity(city)
            setCityEditorParam({
                ...cityEditorParam,
                city: city || newCity
            })
        }
    }

    const onOpenItemEditor = (editorType: EditorType, item: Item) => {
        setItemEditorParam({
                item,
                editorType
            }
        )
        setItemEditorVisible(true)
    }

    const itemActionHandler = new ItemActionHandler({
        onClose: () => setItemEditorVisible(false),
        onUpdate: (item: Item) => {
            const toUpdate: CityStorage = {
                ...cityStorage,
                items: update(cityStorage.items, item)
            }

            dispatch(updateStorage(toUpdate))
            console.log('update item', item)
        },
        onInsert: (item: Item) => {
            const toUpdate: CityStorage = {
                ...cityStorage,
                items: insert(cityStorage.items, item)
            }

            dispatch(updateStorage(toUpdate))
            console.log('insert item', item)
        },
        onCancel: () => {
            setItemEditorVisible(false)
        },
        onDelete: (item: Item) => {
            console.log('delete item', item)
        },
        onOpen: onOpenItemEditor
    })

    return (
        <>
            <TopAppBar>
                <Toolbar>
                    <AppBarTitle title={selectedCity?.name || messages.citiesTable.noSelection}/>
                </Toolbar>
            </TopAppBar>
            <Grid container direction="column" spacing={2}>
                <Grid item xs={12} sm={4}>
                    <CitiesTable cities={cities} actionHandler={cityActionCallbacks}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <ItemActionContext.Provider value={itemActionHandler}>
                        <CityDetailsView storage={cityStorage} city={selectedCity}/>
                    </ItemActionContext.Provider>
                </Grid>
            </Grid>
            <CityEditor city={cityEditorParam.city}
                        title={cityEditorParam.title}
                        actionHandler={cityActionCallbacks}
                        editorOpen={cityEditorVisible}/>

            <ItemEditor title={"blabla"}
                        editorOpen={itemEditorVisible}
                        item={itemEditorParam.item}
                        editorType={itemEditorParam.editorType}
                        itemActionHandler={itemActionHandler}
            />

            <AppBar position="fixed" sx={{top: 'auto', bottom: 0}} color='primary'>
                <Toolbar>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexGrow: 1}}>
                        <AppBarAction label={messages.citiesTable.addCity} icon={"City"}
                                      callback={cityActionCallbacks.onInsert}
                        />
                        <ItemAppBarAction
                            label={messages.citiesItemsTable.actions.add}
                            icon={"Storage"}
                            onOpenEditor={onOpenItemEditor}
                            editorType={'insert'}
                            item={ItemActionHandler.createNewItem()}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default CitiesView