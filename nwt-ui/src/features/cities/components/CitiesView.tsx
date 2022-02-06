import React, {useState} from "react";
import {Grid, Toolbar} from "@mui/material";
import {CitiesTable} from "features/cities/components/CitiesTable";
import CityDetailsView from "features/cities/components/CityDetailsView";
import {City, Undefined} from "common/types/commonTypes";
import AppBarContainer from "common/components/AppBarContainer";
import {messages} from "common/i18n/messages";
import {useAppSelector} from "app/state/hooks";
import {selectCity} from "features/cities/state/citiesSlice";
import AppBarTitle from "common/components/AppBarTitle";

const CitiesView = () => {
    // const {selection} = useAppSelector(selectSelection)
    // const {players} = useAppSelector(selectPlayers)
    const [selectedCity, setSelectedCity] = useState<Undefined<City>>(undefined)
    const {cities} = useAppSelector(selectCity)

    const onUpdateCitySelection = (city: Undefined<City>) => {
        setSelectedCity(city)
    }

    const onUpdateModifiedCity = (city: City) => {
        console.log('modified city', city)
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
                    <CityDetailsView city={selectedCity} onModify={onUpdateModifiedCity}/>
                </Grid>
            </Grid>
        </>
    )
}

export default CitiesView