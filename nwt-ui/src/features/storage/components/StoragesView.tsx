import Grid from "@mui/material/Grid/Grid";
import {useAppSelector} from "app/state/hooks";
import {selectData} from "features/data/state/dataSlice";
import {selectSelection} from "features/data/state/selectionSlice";
import selectionService from "features/selection/service/selectionService";
import {messages} from "common/i18n/messages";
import * as React from "react";
import {useState} from "react";
import ItemSummaryTable, {ItemSummaryTableRow} from "features/storage/components/ItemSummaryTable";
import {makeStyles} from "@mui/styles";
import {AppTheme} from "app/components/App";
import LayoutConstants from "common/components/layoutConstants";
import AppBarContainer from "common/components/AppBarContainer";
import {Toolbar, Typography} from "@mui/material";

const useStyles = makeStyles((_: AppTheme) => {
    const {drawerWidth} = LayoutConstants

    return {
        itemName: {
            marginLeft: drawerWidth
        },
    }
})

const StoragesView = () => {
    const classes = useStyles()
    const {user: users} = useAppSelector(selectData)
    const {selection} = useAppSelector(selectSelection)
    const {player} = selectionService.selectedData(users, selection)
    const [selectedRow, setSelectedRow] = useState<ItemSummaryTableRow | undefined>(undefined)
    const onUpdateItemSelection = (itemSummary: ItemSummaryTableRow | undefined) => {
        setSelectedRow(itemSummary)
    }

    const itemSummaryText = selectedRow ? `${selectedRow.name}: ${selectedRow.totalQuantity}` : messages.citiesItemsTable.noSelection

    return (
        <>
            <AppBarContainer>
                <Toolbar>
                    <div className={classes.itemName}>
                        <Typography>{itemSummaryText}</Typography>
                    </div>
                </Toolbar>
            </AppBarContainer>

            <Grid container direction="column" spacing={2}>
                <Grid item xs={12} sm={4}>
                    <ItemSummaryTable player={player} onRowSelected={onUpdateItemSelection}/>
                </Grid>
            </Grid>
        </>
    )
}

export default StoragesView