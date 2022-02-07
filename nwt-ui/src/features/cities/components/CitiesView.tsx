import React, {useState} from "react";
import {Grid, Toolbar} from "@mui/material";
import {CitiesTable} from "features/cities/components/CitiesTable";
import CityDetailsView from "features/cities/components/CityDetailsView";
import {City, Undefined} from "common/types/commonTypes";
import AppBarContainer from "common/components/AppBarContainer";
import {messages} from "common/i18n/messages";
import {useAppDispatch, useAppSelector} from "app/state/hooks";
import {selectCity, updateCity} from "features/cities/state/citiesSlice";
import AppBarTitle from "common/components/AppBarTitle";
import {emptyStorage, selectStorage} from "features/storage/state/storageSlice";

const CitiesView = () => {
    const [selectedCity, setSelectedCity] = useState<Undefined<City>>(undefined)
    const {cities} = useAppSelector(selectCity)
    const {storages} = useAppSelector(selectStorage)
    const dispatch = useAppDispatch()
    const cityStorage = storages.find(storage => storage.city === selectedCity?.key) || emptyStorage

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

    return (
        <>
            <AppBarContainer>
                <Toolbar>
                    <AppBarTitle title={selectedCity?.name || messages.citiesTable.noSelection}/>
                </Toolbar>
            </AppBarContainer>
            <Grid container direction="column" spacing={2}>
                <Grid item xs={12} sm={4}>
                    <CitiesTable cities={cities} onRowSelected={onUpdateCitySelection}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CityDetailsView storage={cityStorage} city={selectedCity} onModify={onUpdateModifiedCity}/>
                </Grid>
            </Grid>
        </>
    )
}

export default CitiesView