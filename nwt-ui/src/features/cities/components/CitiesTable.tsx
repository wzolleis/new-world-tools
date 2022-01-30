import {DataGrid, GridCallbackDetails, GridColDef, GridRenderCellParams, GridSelectionModel} from '@mui/x-data-grid';
import {City, ObjectKey, Player} from "common/types/commonTypes";
import {messages} from "common/i18n/messages";
import * as React from "react";
import {IconButton, Menu} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface CitiesTableProps {
    player: Player | undefined
    onRowSelected: (city: City | undefined) => void
}

interface CityTableRow {
    id: string
    world: string
    city: string
    details: string
    actions: string
}

const columns = (handleTableActionsClick: (event: React.MouseEvent<HTMLButtonElement>, rowId: ObjectKey) => void): GridColDef[] => [
    {
        field: 'world', headerName: messages.citiesTable.world, filterable: false, flex: 1
    },
    {
        field: 'city', headerName: messages.citiesTable.city, filterable: true, flex: 1
    },
    {
        field: 'details', headerName: messages.citiesTable.details, filterable: false, flex: 1
    },
    {
        field: 'actions',
        headerName: messages.citiesTable.actions,
        filterable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <IconButton onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleTableActionsClick(event, params.id as string)}>
                    <MoreVertIcon/>
                </IconButton>
            )
        }
    }
]

const mapToCities = (player: Player): City[] => {
    return player.worlds.flatMap(world => world.cities)
}


const mapToTableRow = (player: Player): CityTableRow[] => {
    return player.worlds.flatMap(world => {
        return world.cities.map(city => {
            return {
                id: city.key,
                world: world.name,
                city: city.name,
                details: city.details,
                actions: 'edit'
            }
        })
    })
}

interface CitiesTableMenuProps {
    anchorEl: HTMLElement | null
    handleMenuClose: () => void
}

const CitiesTableMenu = ({anchorEl, handleMenuClose}: CitiesTableMenuProps) => {
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
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>

    )
}

export const CitiesTable = ({player, onRowSelected}: CitiesTableProps) => {
    // anchor element fuer das Menu der Tabelle, wird beim Klick auf eine Zelle gesetzt
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    if (!player) {
        return <div>{messages.common.noSelection}</div>
    }

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const cities = mapToCities(player)
    const rows: CityTableRow[] = mapToTableRow(player)
    const handleTableActionsClick = (event: React.MouseEvent<HTMLButtonElement>, _: ObjectKey) => {
        // const city = cities.find(city => city.key === cityKey)
        setAnchorEl(event.currentTarget)
    }

    const onSelectionChange = (selectionModel: GridSelectionModel, _: GridCallbackDetails) => {
        const cityKey = selectionModel.length > 0 ? selectionModel[0] : null
        const city = cities.find(city => city.key === cityKey)
        onRowSelected(city)
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

                <CitiesTableMenu handleMenuClose={handleMenuClose} anchorEl={anchorEl}/>
            </div>
        </div>
    )
}