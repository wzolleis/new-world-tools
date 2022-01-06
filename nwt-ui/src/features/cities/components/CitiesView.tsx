import React from "react";
import {Grid} from "@mui/material";
import CityCard from "features/cities/components/CityCard";
import {City} from "common/types/commonTypes";
import {useAppSelector} from "app/state/hooks";
import {selectCities} from "features/cities/state/citiesSlice";

const CitiesView = () => {
    const {cities} = useAppSelector(selectCities)

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