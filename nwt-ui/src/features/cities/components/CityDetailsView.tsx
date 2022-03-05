import {Grid, Typography} from "@mui/material";
import {City, CityStorage} from "common/types/commonTypes";
import React, {useContext} from "react";
import {messages} from "common/i18n/messages";
import CityItemTable from "features/storage/components/CityItemTable";
import {ItemActionContext} from "features/cities/components/CitiesView";

export interface CityDetailsViewProps {
    city: City | undefined
    storage: CityStorage
}

const CityDetailsView = ({city, storage}: CityDetailsViewProps) => {
    const actionHandler = useContext(ItemActionContext)
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
                    <CityItemTable storage={storage} city={city} actionHandler={actionHandler}/>
                </Grid>
            </Grid>
        </div>
    )
}

export default CityDetailsView