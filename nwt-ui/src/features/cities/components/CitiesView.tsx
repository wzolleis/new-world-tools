import React, {useState} from "react";
import {Grid, Toolbar, Typography} from "@mui/material";
import {useAppSelector} from "app/state/hooks";
import {selectData} from "features/data/state/dataSlice";
import selectionService from "features/selection/service/selectionService";
import {selectSelection} from "features/data/state/selectionSlice";
import {CitiesTable} from "features/cities/components/CitiesTable";
import CityDetailsView from "features/cities/components/CityDetailsView";
import {City} from "common/types/commonTypes";
import AppBarContainer from "common/components/AppBarContainer";
import {messages} from "common/i18n/messages";
import {makeStyles} from "@mui/styles";
import {AppTheme} from "app/components/App";
import LayoutConstants from "common/components/layoutConstants";

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
    const {user} = useAppSelector(selectData)
    const {selection} = useAppSelector(selectSelection)
    const {player} = selectionService.selectedData(user, selection)
    const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined)

    const onUpdateCitySelection = (city: City | undefined) => {
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
                    <CitiesTable player={player} onRowSelected={onUpdateCitySelection}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <CityDetailsView city={selectedCity} onModify={onUpdateModifiedCity}/>
                </Grid>
            </Grid>
        </>
    )
}

export default CitiesView