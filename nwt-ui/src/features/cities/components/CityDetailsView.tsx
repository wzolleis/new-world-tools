import {Grid, Toolbar, Typography} from "@mui/material";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "app/state/hooks";
import {listCity, selectCity} from "features/cities/state/citiesSlice";
import {useParams} from "react-router-dom";
import TopAppBar from "common/components/TopAppBar";
import AppBarTitle from "common/components/AppBarTitle";
import AppBarButton from "common/appbar/AppBarButton";
import AppBarIcon from "common/appbar/AppBarIcon";

const BackButton = () => {
    return (
        <AppBarButton
            variant="outlined"
            startIcon={<AppBarIcon icon={"City"}/>}
            onClick={() => {
                console.log('click back button')
            }}
        >
            {'Back'}
        </AppBarButton>
    )
}

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
            <TopAppBar>
                <Toolbar>
                    <AppBarTitle children={<BackButton/>}/>
                </Toolbar>
            </TopAppBar>
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