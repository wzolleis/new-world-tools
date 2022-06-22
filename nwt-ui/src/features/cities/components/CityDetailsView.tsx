import {Grid, Toolbar, Typography} from "@mui/material";
import React from "react";
import {useParams} from "react-router-dom";
import TopAppBar from "common/components/TopAppBar";
import AppBarTitle from "common/components/AppBarTitle";
import AppBarButton from "common/appbar/AppBarButton";
import AppBarIcon from "common/appbar/AppBarIcon";
import {useDeleteCityMutation, useListCitiesQuery, useUpdateCityMutation} from "common/api/queryApi";
import Button from "@mui/material/Button";

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
    const {data: cities = []} = useListCitiesQuery()
    const [updateCity] = useUpdateCityMutation()
    const [deleteCity] = useDeleteCityMutation()
    const params = useParams();
    const city = cities.find(city => city.key === params.key)
    if (!city) return null

    const onUpdateCity = () => {
        const toUpdate = {
            ...city,
            name: 'dummy ' + city.name
        }
        updateCity(toUpdate)
    }

    const onDeleteCity = () => {
        deleteCity(city)
    }

    return (
        <div>
            <TopAppBar>
                <Toolbar>
                    <AppBarTitle children={<BackButton/>}/>
                    <Button variant='contained' onClick={onUpdateCity}>update city</Button>
                    <Button variant='contained' onClick={onDeleteCity}>delete city</Button>
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