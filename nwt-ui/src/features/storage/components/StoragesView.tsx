import Grid from "@mui/material/Grid/Grid";
import {messages} from "common/i18n/messages";
import * as React from "react";
import {useState} from "react";
import ItemSummaryTable, {ItemSummaryTableRow} from "features/storage/components/ItemSummaryTable";
import TopAppBar from "common/components/TopAppBar";
import {Toolbar} from "@mui/material";
import AppBarTitle from "common/components/AppBarTitle";
import {useListCitiesQuery, useListStoragesQuery} from "common/api/queryApi";

const StoragesView = () => {
    const {data: cities = []} = useListCitiesQuery()
    const {data: storages = []} = useListStoragesQuery()
    const [selectedRow, setSelectedRow] = useState<ItemSummaryTableRow | undefined>(undefined)
    const onUpdateItemSelection = (itemSummary: ItemSummaryTableRow | undefined) => {
        setSelectedRow(itemSummary)
    }

    const itemSummaryText = selectedRow ? `${selectedRow.name}: ${selectedRow.totalQuantity}` : messages.citiesItemsTable.noSelection

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
        </>
    )
}

export default StoragesView