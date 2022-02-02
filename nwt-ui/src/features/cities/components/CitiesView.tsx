import React, {useState} from "react";
import {Grid} from "@mui/material";
import {useAppSelector} from "app/state/hooks";
import {selectData} from "features/data/state/dataSlice";
import selectionService from "features/selection/service/selectionService";
import {selectSelection} from "features/data/state/selectionSlice";
import {CitiesTable} from "features/cities/components/CitiesTable";
import CityDetailsView from "features/cities/components/CityDetailsView";
import {City, CommonActionType} from "common/types/commonTypes";
import CitiesSpeedDial from "features/cities/components/CitiesSpeedDial";

const CitiesView = () => {
    const {user} = useAppSelector(selectData)
    const {selection} = useAppSelector(selectSelection)
    const selectedData = selectionService.selectedData(user, selection)
    const [selectedCity, setSelectedCity] = useState<City | undefined>(undefined)
    const [modifedCity, setModifiedCity] = useState<City | undefined>(undefined)

    const onUpdateCitySelection = (city: City | undefined) => {
        setSelectedCity(city)
        setModifiedCity(undefined)
    }

    const onAction = (action: CommonActionType) => {
        console.log('action', action)
        if (action === "save" && !!modifedCity) {
            onSave(modifedCity)
        }
    }

    const onUpdateModifiedCity = (city: City) => setModifiedCity(city)

    const onSave = (city: City | undefined) => {
        console.log('save city', city)
    }

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item xs={12} sm={4}>
                <CitiesTable player={selectedData.player} onRowSelected={onUpdateCitySelection}/>
            </Grid>
            <Grid item xs={12} sm={4}>
                <CityDetailsView city={selectedCity} onModify={onUpdateModifiedCity}/>
            </Grid>
            <CitiesSpeedDial onAction={onAction}/>
        </Grid>
    )
}

export default CitiesView