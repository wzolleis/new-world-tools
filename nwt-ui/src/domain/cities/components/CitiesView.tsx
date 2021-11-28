import React from "react";
import {useStateMachine} from "little-state-machine";
import {Grid} from "@mui/material";
import CityCard from "domain/cities/components/CityCard";
import {City} from "common/types/commonTypes";
import {selectedData, selectedPlayer} from "domain/selection/roles/selectionRole";

const CitiesView = () => {
    const {state} = useStateMachine()
    const {cities} = selectedPlayer(state)

    return (
        <Grid sx={{flexGrow: 1}} container spacing={{xs: 2, md: 3}} columns={{xs: 1, sm: 1, md: 1}}>
            {cities.map((city: City) => {
                return (
                    <Grid item key={city.key}>
                        <CityCard city={city}/>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default CitiesView