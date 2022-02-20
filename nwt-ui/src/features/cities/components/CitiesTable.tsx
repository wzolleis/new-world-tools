import {DataGrid, GridCallbackDetails, GridColDef, GridRenderCellParams, GridSelectionModel} from '@mui/x-data-grid';
import {City, ObjectKey} from "common/types/commonTypes";
import {messages} from "common/i18n/messages";
import * as React from "react";
import {useEffect} from "react";
import {IconButton, ListItemIcon, ListItemText, Menu} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AppIcon from "common/components/AppIcon";

interface CitiesTableProps {
    cities: City[]
    onRowSelected: (city: City | undefined) => void
    onTableAction: (action: string) => void
}

interface CityTableRow {
    id: string
    city: string
    details: string
}

const columns = (handleTableActionsClick: (event: React.MouseEvent<HTMLButtonElement>, rowId: ObjectKey) => void): GridColDef[] => [
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
                    <MoreHorizIcon/>
                </IconButton>
            )
        }
    }
]

const mapToTableRow = (cities: City[]): CityTableRow[] => {
    return cities.map(city => {
        return {
            id: city.key,
            city: city.name,
            details: city.details,
        }
    })
}

interface CitiesTableMenuProps {
    anchorEl: HTMLElement | null
    handleAction: (action: string) => void
    handleMenuClose: () => void
}

const CitiesTableMenu = ({anchorEl, handleMenuClose, handleAction}: CitiesTableMenuProps) => {
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
            <MenuItem onClick={() => handleAction("edit_city")}>
                <ListItemIcon>
                    <AppIcon icon={"Edit"}/>
                </ListItemIcon>
                <ListItemText>{messages.crudActions.edit}</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => handleAction("delete_city")}>
                <ListItemIcon>
                    <AppIcon icon={"Delete"}/>
                </ListItemIcon>
                <ListItemText>{messages.crudActions.delete}</ListItemText>
            </MenuItem>

        </Menu>

    )
}

export const CitiesTable = ({cities, onRowSelected, onTableAction}: CitiesTableProps) => {
    // anchor element fuer das Menu der Tabelle, wird beim Klick auf eine Zelle gesetzt
    const rows: CityTableRow[] = mapToTableRow(cities)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const initialSelection = cities.length > 0 ? [cities[0].key] : []
    const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>(initialSelection);
    useEffect(() => {
        if (initialSelection.length > 0) {
            const selectedCity = cities.find(city => city.key === initialSelection[0])
            onRowSelected(selectedCity)
        }
    }, [])
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleTableActionsClick = (event: React.MouseEvent<HTMLButtonElement>, _: ObjectKey) => {
        setAnchorEl(event.currentTarget)
    }

    const onSelectionChange = (selectionModel: GridSelectionModel, _: GridCallbackDetails) => {
        setSelectionModel(selectionModel)
        const cityKey = selectionModel.length > 0 ? selectionModel[0] : null
        const city = cities.find(city => city.key === cityKey)
        onRowSelected(city)
    }

    const onTableMenuAction = (action: string) => {
        handleMenuClose()
        onTableAction(action)
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
                        selectionModel={selectionModel}
                    />
                </div>

                <CitiesTableMenu handleMenuClose={handleMenuClose} handleAction={onTableMenuAction}
                                 anchorEl={anchorEl}/>
            </div>
        </div>
    )
}