import {Grid, Toolbar, Typography} from "@mui/material";
import React from "react";
import {useNavigate, useParams} from "react-router-dom";
import TopAppBar from "common/components/TopAppBar";
import AppBarTitle from "common/components/AppBarTitle";
import AppBarButton from "common/appbar/AppBarButton";
import AppBarIcon from "common/appbar/AppBarIcon";
import {useDeleteCityMutation, useListCitiesQuery, useUpdateCityMutation} from "common/api/queryApi";
import {messages} from "common/i18n/messages";


interface NavigateButtonProps {
    navigate: (offset: number) => void
}

const BackButton = (props: NavigateButtonProps) => {
    const {navigate} = props
    return (
        <AppBarButton
            variant="outlined"
            startIcon={<AppBarIcon icon={"City"}/>}
            onClick={() => {
                navigate(-1)
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
    const navigate = useNavigate()
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


    const onNavigate = (offset: number) => navigate(offset)

    return (
        <div>
            <TopAppBar>
                <Toolbar>
                    <AppBarTitle children={<BackButton navigate={onNavigate}/>}/>
                    <AppBarButton onClick={onUpdateCity}>{messages.cityEditor.edit.title}</AppBarButton>
                    <AppBarButton onClick={onDeleteCity}>{messages.cityEditor.delete.title}</AppBarButton>
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
                        {city.name}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default CityDetailsView