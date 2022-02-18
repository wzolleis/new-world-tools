import React, {useState} from "react";
import {AppBar, Grid, Toolbar} from "@mui/material";
import {CitiesTable} from "features/cities/components/CitiesTable";
import CityDetailsView from "features/cities/components/CityDetailsView";
import {City, Undefined} from "common/types/commonTypes";
import TopAppBar from "common/components/TopAppBar";
import {messages} from "common/i18n/messages";
import {useAppDispatch, useAppSelector} from "app/state/hooks";
import {selectCity, updateCity} from "features/cities/state/citiesSlice";
import AppBarTitle from "common/components/AppBarTitle";
import {emptyStorage, selectStorage} from "features/storage/state/storageSlice";
import {useTheme} from "@mui/material/styles";
import {AppTheme} from "app/components/appTheme";
import AppBarAction from "common/appbar/AppBarAction";
import Box from "@mui/material/Box";
import CityEditor, {CityFormData} from "features/cities/components/CityEditor";

const CitiesView = () => {
    const [selectedCity, setSelectedCity] = useState<Undefined<City>>(undefined)
    const {cities} = useAppSelector(selectCity)
    const {storages} = useAppSelector(selectStorage)
    const dispatch = useAppDispatch()
    const cityStorage = storages.find(storage => storage.city === selectedCity?.key) || emptyStorage
    const theme = useTheme<AppTheme>()
    const [cityEditorVisible, setCityEditorVisible] = React.useState(false);

    const onUpdateCitySelection = (city: Undefined<City>) => {
        setSelectedCity(city)
    }

    const onUpdateModifiedCity = (city: City) => {
        console.log('modified city', city)
        dispatch(updateCity(city))
    }

    // const onSave = (city: City | undefined) => {
    //     console.log('save city', city)
    // }

    const onAppBarAction = (action: string) => {
        console.log('action', action)
        if (action === 'add_city') onAddCity()
    }

    const onAddCity = () => {
        console.log('add city')
        setCityEditorVisible(true)
    }

    const handleCityEditorClose = () => {
        setCityEditorVisible(false)
    }

    const onSaveCity = (values: CityFormData) => {
        console.log('save city', values)
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
                    <CitiesTable cities={cities} onRowSelected={onUpdateCitySelection}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CityDetailsView storage={cityStorage} city={selectedCity} onModify={onUpdateModifiedCity}/>
                </Grid>
            </Grid>
            <CityEditor city={selectedCity} onSave={onSaveCity} handleClose={handleCityEditorClose}
                        editorOpen={cityEditorVisible}/>

            <AppBar position="fixed" sx={{top: 'auto', bottom: 0}} color='primary'>
                <Toolbar>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexGrow: 1}}>
                        <AppBarAction action={'add_city'} label={messages.citiesTable.addCity} icon={"City"}
                                      callback={onAppBarAction}
                        />
                        <AppBarAction action={'add_item'} label={messages.citiesItemsTable.actions.add} icon={"Storage"}
                                      callback={onAppBarAction}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default CitiesView