import React, {useState} from "react";
import {AppBar, Grid, Toolbar} from "@mui/material";
import {CitiesTable} from "features/cities/components/CitiesTable";
import CityDetailsView from "features/cities/components/CityDetailsView";
import {City, Undefined} from "common/types/commonTypes";
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

const CitiesView = () => {
    const [selectedCity, setSelectedCity] = useState<Undefined<City>>(undefined)
    const {cities} = useAppSelector(selectCity)
    const {storages} = useAppSelector(selectStorage)
    const dispatch = useAppDispatch()
    const cityStorage = storages.find(storage => storage.city === selectedCity?.key) || emptyStorage
    const [cityEditorVisible, setCityEditorVisible] = React.useState(false);
    const [cityEditorParam, setCityEditorParam] = React.useState<CityEditorParam>(cityEditorParamNew)

    const onUpdateCitySelection = (city: Undefined<City>) => {
        setSelectedCity(city)
        setCityEditorParam({
            ...cityEditorParam,
            city: city || newCity
        })
    }

    // const onUpdateModifiedCity = (toUpdate: City) => {

    // }

    const onCityAction = (action: string) => {
        console.log('action', action)
        if (action === 'add_city') onAddCity()
        if (action === 'edit_city') onEditCity()
    }

    const onAddCity = () => {
        setCityEditorParam({
            ...cityEditorParam,
            city: newCity,
            title: messages.cityEditor.create.title
        })
        setCityEditorVisible(true)
    }

    const onEditCity = () => {
        setCityEditorParam({
            ...cityEditorParam,
            city: selectedCity || newCity,
            title: messages.cityEditor.edit.title
        })
        setCityEditorVisible(true)
    }

    const handleCityEditorClose = () => {
        setCityEditorVisible(false)
    }

    const onSaveCity = (values: CityFormData) => {
        const toUpdate = {
            ...cityEditorParam.city,
            ...values
        }
        const cityExists = cities.findIndex(city => city.key === toUpdate.key) >= 0
        if (cityExists)
            dispatch(updateCity(toUpdate))
        else
            dispatch(insertCity(toUpdate))
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
                    <CitiesTable cities={cities} onRowSelected={onUpdateCitySelection} onTableAction={onCityAction}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CityDetailsView storage={cityStorage} city={selectedCity}/>
                </Grid>
            </Grid>
            <CityEditor city={cityEditorParam.city}
                        title={cityEditorParam.title}
                        onSave={onSaveCity}
                        handleClose={handleCityEditorClose}
                        editorOpen={cityEditorVisible}/>

            <AppBar position="fixed" sx={{top: 'auto', bottom: 0}} color='primary'>
                <Toolbar>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexGrow: 1}}>
                        <AppBarAction action={'add_city'} label={messages.citiesTable.addCity} icon={"City"}
                                      callback={onCityAction}
                        />
                        <AppBarAction action={'add_item'} label={messages.citiesItemsTable.actions.add} icon={"Storage"}
                                      callback={onCityAction}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default CitiesView