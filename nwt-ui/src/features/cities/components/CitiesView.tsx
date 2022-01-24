import React from "react";
import {Grid} from "@mui/material";
import {useAppSelector} from "app/state/hooks";
import {selectData} from "features/data/state/dataSlice";
import selectionService from "features/selection/service/selectionService";
import {selectSelection} from "features/data/state/selectionSlice";
import {CitiesTable} from "features/cities/components/CitiesTable";

const CitiesView = () => {
    const {user} = useAppSelector(selectData)
    const {selection} = useAppSelector(selectSelection)
    const selectedData = selectionService.selectedData(user, selection)

    return (
        <Grid sx={{flexGrow: 1}} container spacing={{xs: 2, md: 3}} columns={{xs: 1, sm: 1, md: 1}}>
            <CitiesTable player={selectedData.player}/>
        </Grid>
    )
}

export default CitiesView