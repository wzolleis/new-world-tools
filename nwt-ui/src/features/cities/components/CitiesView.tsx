import React, {createContext, useState} from "react";
import {AppBar, Grid, Toolbar} from "@mui/material";
import {CitiesTable} from "features/cities/components/CitiesTable";
import CityDetailsView from "features/cities/components/CityDetailsView";
import {City, Item, Undefined} from "common/types/commonTypes";
import TopAppBar from "common/components/TopAppBar";
import {messages} from "common/i18n/messages";
import {useAppDispatch, useAppSelector} from "app/state/hooks";
import {insertCity, selectCity, updateCity} from "features/cities/state/citiesSlice";
import AppBarTitle from "common/components/AppBarTitle";
import {emptyStorage, selectStorage} from "features/storage/state/storageSlice";
import AppBarAction from "common/appbar/AppBarAction";
import Box from "@mui/material/Box";
import CityEditor, {CityFormData} from "features/cities/components/CityEditor";
import {v4 as uuidv4} from 'uuid';
import {ItemFormData} from "features/storage/components/ItemEditor";

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
    onAddCity: () => void
    onEditCity: () => void
    onSubmit: (values: CityFormData) => void
    onCancel: () => void
    onDeleteCity: () => void
    onSelect: (city: Undefined<City>) => void
}

export interface ItemActionHandler {
    onAddItem: () => void
    onEditItem: () => void
    onDeleteItem: () => void
    onCancel: () => void
    onSubmit: (values: ItemFormData) => void
    onSelect: (item: Undefined<Item>) => void
}

export const ItemActionContext = createContext<ItemActionHandler>({
    onSubmit: () => {
    },
    onCancel: () => {
    },
    onAddItem: () => {
    },
    onEditItem: () => {
    },
    onDeleteItem: () => {
    },
    onSelect: () => {
    }
})

const CitiesView = () => {
    const [selectedCity, setSelectedCity] = useState<Undefined<City>>(undefined)
    const {cities} = useAppSelector(selectCity)
    const {storages} = useAppSelector(selectStorage)
    const dispatch = useAppDispatch()
    const cityStorage = storages.find(storage => storage.city === selectedCity?.key) || emptyStorage
    const [cityEditorVisible, setCityEditorVisible] = useState(false);
    const [cityEditorParam, setCityEditorParam] = useState<CityEditorParam>(cityEditorParamNew)

    const cityActionCallbacks: CityActionHandler = {
        onAddCity: () => {
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
                        <CityDetailsView storage={cityStorage} city={selectedCity}/>
                </Grid>
            </Grid>
            <CityEditor city={cityEditorParam.city}
                        title={cityEditorParam.title}
                        actionHandler={cityActionCallbacks}
                        editorOpen={cityEditorVisible}/>

            <AppBar position="fixed" sx={{top: 'auto', bottom: 0}} color='primary'>
                <Toolbar>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexGrow: 1}}>
                        <AppBarAction label={messages.citiesTable.addCity} icon={"City"}
                                      callback={cityActionCallbacks.onAddCity}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default CitiesView