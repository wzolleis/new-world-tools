import {Grid, Typography} from "@mui/material";
import {City, CityStorage} from "common/types/commonTypes";
import React from "react";
import {messages} from "common/i18n/messages";
import ItemTable from "features/storage/components/ItemTable";

export interface CityDetailsViewProps {
    city: City | undefined
    storage: CityStorage,
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
                    <ItemTable storage={storage} city={city}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default CityDetailsView