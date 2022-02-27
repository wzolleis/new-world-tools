import {Grid, Typography} from "@mui/material";
import {City, CityStorage} from "common/types/commonTypes";
import React from "react";
import {messages} from "common/i18n/messages";
import CityItemTable from "features/cities/components/CityItemTable";

export interface CityDetailsViewProps {
    city: City | undefined
    storage: CityStorage
}

interface CityFormData {
    name: string
    details: string
}

const formValues = (city: City | undefined): CityFormData => {
    const emptyFormValues = {
        name: "",
        details: ""
    }
    return city ? {name: city.name, details: city.details} : emptyFormValues
}

const CityDetailsView = ({city, storage}: CityDetailsViewProps) => {
    if (!city) return null
    return (
        <div>
            <Grid container direction="column" spacing={2}>
                <Grid item xs={6} sm={6}>
                    <Typography variant="h6" align="left" margin="dense">
                        {messages.citiesItemsTable.lager}
                    </Typography>
                </Grid>

                <Grid item xs={6} sm={6}>
                    <CityItemTable storage={storage} city={city}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default CityDetailsView