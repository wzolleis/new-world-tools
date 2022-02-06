import Grid from "@mui/material/Grid/Grid";
import {useAppSelector} from "app/state/hooks";
import {messages} from "common/i18n/messages";
import * as React from "react";
import {useState} from "react";
import ItemSummaryTable, {ItemSummaryTableRow} from "features/storage/components/ItemSummaryTable";
import {makeStyles} from "@mui/styles";
import {AppTheme} from "app/components/App";
import LayoutConstants from "common/components/layoutConstants";
import AppBarContainer from "common/components/AppBarContainer";
import {Toolbar, Typography} from "@mui/material";
import {selectCity} from "features/cities/state/citiesSlice";
import {selectStorage} from "features/storage/state/storageSlice";

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
    const {cities} = useAppSelector(selectCity)
    const {storages} = useAppSelector(selectStorage)
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
                    <ItemSummaryTable cities={cities} storages={storages} onRowSelected={onUpdateItemSelection}/>
                </Grid>
            </Grid>
        </>
    )
}

export default StoragesView