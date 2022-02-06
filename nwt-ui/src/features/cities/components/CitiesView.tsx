import React, {useState} from "react";
import {Grid, Toolbar, Typography} from "@mui/material";
import {CitiesTable} from "features/cities/components/CitiesTable";
import CityDetailsView from "features/cities/components/CityDetailsView";
import {City, Player, Undefined} from "common/types/commonTypes";
import AppBarContainer from "common/components/AppBarContainer";
import {messages} from "common/i18n/messages";
import {makeStyles} from "@mui/styles";
import {AppTheme} from "app/components/App";
import LayoutConstants from "common/components/layoutConstants";
import {useAppSelector} from "app/state/hooks";
import {selectCity} from "features/cities/state/citiesSlice";

const useStyles = makeStyles((_: AppTheme) => {
    const {drawerWidth} = LayoutConstants

    return {
        cityName: {
            marginLeft: drawerWidth
        },
    }
})

const CitiesView = () => {
    const classes = useStyles()
    // const {selection} = useAppSelector(selectSelection)
    // const {players} = useAppSelector(selectPlayers)
    const [selectedCity, setSelectedCity] = useState<Undefined<City>>(undefined)
    const player: Undefined<Player> = undefined
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
                    <div className={classes.cityName}>
                        <Typography>{selectedCity?.name || messages.citiesTable.noSelection}</Typography>
                    </div>
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