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
import {emptyStorage, insertStorage, selectStorage, updateStorage} from "features/storage/state/storageSlice";
import Box from "@mui/material/Box";
import CityEditor from "features/cities/components/CityEditor";
import {v4 as uuidv4} from 'uuid';
import {ItemActionHandler} from "features/storage/actions/ItemActionHandler";
import ItemEditor from "features/storage/components/ItemEditor";
import {EditorType} from "common/types/editorType";
import ItemAppBarAction from "features/storage/actions/ItemAppBarAction";
import {insert, update} from "utils/arrayUtils";
import {CityActionHandler} from "features/cities/actions/CityActionHandler";
import CityAppBarAction from "features/cities/actions/CityAppBarAction";
import {ActionHandler} from "common/actions/ActionHandler";

interface CityEditorParam {
    city: City
    title: string
    editorType: EditorType
}

const newCity: City = {
    name: '', details: '', key: uuidv4(), player: '', world: ''
}

const cityEditorParamNew: CityEditorParam = {
    city: newCity,
    title: messages.cityEditor.create.title,
    editorType: 'insert'
}

interface ItemEditorParam {
    item: Item
    editorType: EditorType
}

export const ActionHandlerContext = createContext<ActionHandler>(new ActionHandler({
    itemActionHandler: ItemActionHandler.createInstance(),
    cityActionHandler: CityActionHandler.createInstance()
}))

const CitiesView = () => {
    const [selectedCity, setSelectedCity] = useState<Undefined<City>>(undefined)
    const {cities} = useAppSelector(selectCity)
    const {storages} = useAppSelector(selectStorage)
    const dispatch = useAppDispatch()
    const [cityEditorVisible, setCityEditorVisible] = useState(false);
    const [cityEditorParam, setCityEditorParam] = useState<CityEditorParam>(cityEditorParamNew)
    const [itemEditorVisible, setItemEditorVisible] = useState(false);
    const [itemEditorParam, setItemEditorParam] = useState<ItemEditorParam>({
        item: ItemActionHandler.createNewItem(),
        editorType: 'edit'
    })
    const cityStorage: CityStorage = storages.find(storage => storage.city === selectedCity?.key) || emptyStorage
    const onOpenCityEditor = (editorType: EditorType, city: City) => {
        setCityEditorParam({
            ...cityEditorParam,
            city,
            editorType
        })
        setCityEditorVisible(true)
    }

    const cityActionHandler: CityActionHandler = new CityActionHandler({
        onInsert: (city: City) => {
            setCityEditorParam({
                ...cityEditorParam,
                city: city,
                title: messages.cityEditor.create.title
            })
            const storage: CityStorage = {
                key: uuidv4(),
                city: city.key,
                items: []
            }
            dispatch(insertCity(city))
            dispatch(insertStorage(storage))
        },
        onUpdate: (city: City) => {
            dispatch(updateCity(city))
        },
        onOpen: onOpenCityEditor,
        onDelete: (city: City) => {
            console.log('TODO: delete city:', city)
        },
        onCancel: () => {
            setCityEditorVisible(false)
        },
        onClose: () => {
            setCityEditorVisible(false)
        },
        onSelect: (city) => {
            setSelectedCity(city)
        }
    })

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

    const actionHandler = new ActionHandler({itemActionHandler, cityActionHandler})

    return (
        <>
            <TopAppBar>
                <Toolbar>
                    <AppBarTitle title={selectedCity?.name || messages.citiesTable.noSelection}/>
                </Toolbar>
            </TopAppBar>
            <Grid container direction="column" spacing={2}>
                <ActionHandlerContext.Provider value={actionHandler}>
                    <Grid item xs={12} sm={4}>
                        <CitiesTable cities={cities}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CityDetailsView storage={cityStorage} city={selectedCity}/>
                    </Grid>
                </ActionHandlerContext.Provider>
            </Grid>
            <CityEditor city={cityEditorParam.city}
                        title={cityEditorParam.title}
                        actionHandler={cityActionHandler}
                        editorOpen={cityEditorVisible}
                        editorType={cityEditorParam.editorType}
            />

            <ItemEditor title={"blabla"}
                        editorOpen={itemEditorVisible}
                        item={itemEditorParam.item}
                        editorType={itemEditorParam.editorType}
                        itemActionHandler={itemActionHandler}
            />

            <AppBar position="fixed" sx={{top: 'auto', bottom: 0}} color='primary'>
                <Toolbar>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexGrow: 1}}>
                        <CityAppBarAction
                            label={messages.citiesTable.addCity}
                            icon={"City"}
                            onOpenEditor={onOpenCityEditor}
                            editorType={'insert'}
                            city={CityActionHandler.createNewCity()}
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