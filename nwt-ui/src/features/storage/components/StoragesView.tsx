import Grid from "@mui/material/Grid/Grid";
import {useAppSelector} from "app/state/hooks";
import {selectData} from "features/data/state/dataSlice";
import {selectSelection} from "features/data/state/selectionSlice";
import selectionService from "features/selection/service/selectionService";
import {messages} from "common/i18n/messages";
import * as React from "react";
import ItemSummaryTable from "features/storage/components/ItemSummaryTable";

const StoragesView = () => {
    const {user: users} = useAppSelector(selectData)
    const {selection} = useAppSelector(selectSelection)
    const {player} = selectionService.selectedData(users, selection)

    if (!player) {
        return <div>{messages.common.noSelection}</div>
    }

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item xs={12} sm={4}>
                <ItemSummaryTable player={player}/>
            </Grid>
        </Grid>
    )
}

export default StoragesView