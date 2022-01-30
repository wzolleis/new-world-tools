import {ObjectKey, Player} from "common/types/commonTypes";
import {DataGrid, GridCallbackDetails, GridColDef, GridRenderCellParams, GridSelectionModel} from "@mui/x-data-grid";
import * as React from "react";
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
    return player.worlds.flatMap(world => {
        return world.cities.flatMap(city => {
            return {
                world: world.name,
                city: city
            }
        })
    })
        .flatMap(data => {
            return data.city.lager.items.flatMap(item => {
                return {
                    id: item.key,
                    world: data.world,
                    city: data.city.name,
                    item: item.name,
                    quantity: item.quantity,
                    category: item.category
                }
            })
        })

}

interface ItemsTableMenuProps {
    anchorEl: HTMLElement | null
    handleMenuClose: () => void
}

const ItemsTableMenu = ({anchorEl, handleMenuClose}: ItemsTableMenuProps) => {
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        </Menu>

    )
}


const columns = (handleTableActionsClick: (event: React.MouseEvent<HTMLButtonElement>, rowId: ObjectKey) => void): GridColDef[] => [
    {
        field: 'world', headerName: messages.citiesItemsTable.world, filterable: false, flex: 1
    },
    {
        field: 'city', headerName: messages.citiesItemsTable.city, filterable: true, flex: 1
    },
    {
        field: 'item', headerName: messages.citiesItemsTable.name, filterable: false, flex: 1
    },
    {
        field: 'quantity', headerName: messages.citiesItemsTable.quantity, filterable: false, flex: 1
    },
    {
        field: 'category', headerName: messages.citiesItemsTable.category, filterable: false, flex: 1
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

    const handleTableActionsClick = (event: React.MouseEvent<HTMLButtonElement>, _: ObjectKey) => {
        setAnchorEl(event.currentTarget)
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const onSelectionChange = (selectionModel: GridSelectionModel, _: GridCallbackDetails) => {
        // const cityKey = selectionModel.length > 0 ? selectionModel[0] : null
        // const city = cities.find(city => city.key === cityKey)
        // onRowSelected(city)
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
            <ItemsTableMenu handleMenuClose={handleMenuClose} anchorEl={anchorEl}/>
        </div>
    )
}

export default ItemsTable