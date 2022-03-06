import Grid from "@mui/material/Grid/Grid";
import {useAppSelector} from "app/state/hooks";
import {messages} from "common/i18n/messages";
import * as React from "react";
import {useState} from "react";
import ItemSummaryTable, {ItemSummaryTableRow} from "features/storage/components/ItemSummaryTable";
import TopAppBar from "common/components/TopAppBar";
import {AppBar, Toolbar} from "@mui/material";
import {selectCity} from "features/cities/state/citiesSlice";
import {selectStorage} from "features/storage/state/storageSlice";
import AppBarTitle from "common/components/AppBarTitle";
import Box from "@mui/material/Box";
import AppBarAction from "common/appbar/AppBarAction";

const StoragesView = () => {
    const {cities} = useAppSelector(selectCity)
    const {storages} = useAppSelector(selectStorage)
    const [selectedRow, setSelectedRow] = useState<ItemSummaryTableRow | undefined>(undefined)
    const onUpdateItemSelection = (itemSummary: ItemSummaryTableRow | undefined) => {
        setSelectedRow(itemSummary)
    }

    const itemSummaryText = selectedRow ? `${selectedRow.name}: ${selectedRow.totalQuantity}` : messages.citiesItemsTable.noSelection
    const onAddItem = () => {
        console.log('add item')
    }

    return (
        <>
            <TopAppBar>
                <Toolbar>
                    <AppBarTitle title={itemSummaryText}/>
                </Toolbar>
            </TopAppBar>

            <Grid container direction="column" spacing={2}>
                <Grid item xs={12} sm={4}>
                    <ItemSummaryTable cities={cities} storages={storages} onRowSelected={onUpdateItemSelection}/>
                </Grid>
            </Grid>

            <AppBar position="fixed" sx={{top: 'auto', bottom: 0}} color='primary'>
                <Toolbar>
                    <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', flexGrow: 1}}>
                        <AppBarAction label={messages.citiesItemsTable.actions.add} icon={"Storage"}
                                      callback={onAddItem}
                        />
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default StoragesView