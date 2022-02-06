import {ObjectKey, Player} from "common/types/commonTypes";
import {
    DataGrid,
    GridCallbackDetails,
    GridCellEditCommitParams,
    GridColDef,
    GridRenderCellParams,
    GridSelectionModel
} from "@mui/x-data-grid";
import * as React from "react";
import {useState} from "react";
import {messages} from "common/i18n/messages";
import {IconButton, Menu} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";

export interface ItemsTableProps {
    player: Player
}

interface ItemTableRow {
    id: string
    world: string
    city: string
    item: string
    category: string
    quantity: number
}

const mapToTableRows = (player: Player): ItemTableRow[] => {
    // const items = player.worlds.flatMap(world => {
    //     return world.cities.flatMap(city => {
    //         return {
    //             world: world.name,
    //             city: city
    //         }
    //     })
    // })
    //     .flatMap(data => {
    //         return data.city.storage.items.flatMap(item => {
    //             return {
    //                 id: item.key,
    //                 world: data.world,
    //                 city: data.city.name,
    //                 item: item.name,
    //                 quantity: item.quantity,
    //                 category: item.category
    //             }
    //         })
    //     })

    // const groupByItemName = groupBy<ItemTableRow>((item) => item.item, items)
    // console.log('groupby', groupByItemName)
    //
    // return items
    return []
}

const ItemActions = {
    delete: 'delete'
}

type ItemActionType = keyof typeof ItemActions

interface ItemsTableMenuProps {
    anchorEl: HTMLElement | null
    handleMenuClick: (event: React.MouseEvent<HTMLElement>, row: ItemTableRow | undefined, action: ItemActionType) => void
    handleMenuClose: () => void
    row: ItemTableRow | undefined
}

const ItemsTableMenu = ({anchorEl, handleMenuClose, row, handleMenuClick}: ItemsTableMenuProps) => {
    return (
        <Menu
            id="item-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{'aria-labelledby': 'basic-button'}}
        >
            <MenuItem
                onClick={(event: React.MouseEvent<HTMLElement>) => handleMenuClick(event, row, 'delete')}>
                {messages.citiesItemsTable.actions.delete}
            </MenuItem>
        </Menu>
    )
}

const columns = (handleTableActionsClick: (event: React.MouseEvent<HTMLButtonElement>, rowId: ObjectKey) => void): GridColDef[] => [
    {
        field: 'item', headerName: messages.citiesItemsTable.name, filterable: true, flex: 1
    },
    {
        field: 'quantity', headerName: messages.citiesItemsTable.quantity, filterable: false, editable: true
    },
    {
        field: 'category', headerName: messages.citiesItemsTable.category, filterable: false, flex: 1
    },
    {
        field: 'city', headerName: messages.citiesItemsTable.city, filterable: true, flex: 1
    },
    {
        field: 'world', headerName: messages.citiesItemsTable.world, filterable: false, flex: 1
    },
    {
        field: 'actions',
        headerName: messages.citiesTable.actions,
        filterable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <IconButton
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleTableActionsClick(event, params.id as string)}>
                    <MoreVertIcon/>
                </IconButton>
            )
        }
    }
]

const ItemsTable = ({player}: ItemsTableProps) => {
    // anchor element fuer das Menu der Tabelle, wird beim Klick auf eine Zelle gesetzt
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const rows: ItemTableRow[] = mapToTableRows(player)
    const [selectedRow, setSelectedRow] = useState<ItemTableRow | undefined>(undefined)

    const handleTableActionsClick = (event: React.MouseEvent<HTMLButtonElement>, _: ObjectKey) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, row: ItemTableRow | undefined, action: ItemActionType) => {
        handleMenuClose()
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const onSelectionChange = (selectionModel: GridSelectionModel, _: GridCallbackDetails) => {
        if (selectionModel.length > 0) {
            const key = selectionModel[0] as string
            const selectedRow = rows.find(row => row.id === key)
            setSelectedRow(selectedRow)
        } else {
            setSelectedRow(undefined)
        }
    }

    const onEditCommit = (params: GridCellEditCommitParams) => {
        console.log('edit cell', params)
    }

    return (
        <div style={{height: 400, width: '100%'}}>
            <div style={{display: 'flex', height: '100%'}}>
                <div style={{flexGrow: 1}}>
                    <DataGrid
                        rows={rows}
                        columns={columns(handleTableActionsClick)}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        showCellRightBorder={true}
                        showColumnRightBorder={true}
                        onSelectionModelChange={onSelectionChange}
                    />
                </div>
            </div>
            <ItemsTableMenu handleMenuClose={handleMenuClose} handleMenuClick={handleMenuClick} anchorEl={anchorEl}
                            row={selectedRow}/>
        </div>
    )
}

export default ItemsTable