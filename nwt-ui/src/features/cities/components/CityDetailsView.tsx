import {Grid, Typography} from "@mui/material";
import React from "react";
import {messages} from "common/i18n/messages";
import {useAppSelector} from "app/state/hooks";
import {selectCity} from "features/cities/state/citiesSlice";
import {useParams} from "react-router-dom";

const CityDetailsView = () => {
    const {cities} = useAppSelector(selectCity)
    const params = useParams();
    const city = cities.find(city => city.key === params.key)
    if (!city) return null

    return (
        <div>
            <Grid container direction="column" spacing={2}>
                <Grid item xs={6} sm={6}>
                    <Typography variant="h6" align="left" margin="dense">
                        {messages.citiesItemsTable.lager}
                    </Typography>
                </Grid>

                {/*
                <Grid item xs={6} sm={6}>
                    <ItemTable storage={storage} city={city}/>
                </Grid>
*/}
            </Grid>
        </div>
    )
}

export default CityDetailsView