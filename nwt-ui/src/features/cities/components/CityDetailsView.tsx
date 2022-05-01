import {Grid, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "app/state/hooks";
import {listCity, selectCity} from "features/cities/state/citiesSlice";
import {useParams} from "react-router-dom";

const CityDetailsView = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(listCity())
    }, [dispatch])

    const {cities} = useAppSelector(selectCity)
    const params = useParams();
    const city = cities.find(city => city.key === params.key)
    if (!city) return null

    return (
        <div>
            <Grid container direction="column" spacing={5}>
                <Grid item xs={6} sm={6}>
                    <Typography variant="h6" align="left" margin="dense">
                        {city.name}
                    </Typography>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <Typography variant="h6" align="left" margin="dense">
                        {city.details}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default CityDetailsView