import {
    DataGrid,
    GridCallbackDetails,
    GridCellParams,
    GridColDef,
    GridRowParams,
    GridSelectionModel,
    MuiEvent
} from '@mui/x-data-grid';
import {Player} from "common/types/commonTypes";
import {messages} from "common/i18n/messages";

interface CitiesTableProps {
    player: Player | undefined
}

interface CityTableData {
    id: string
    world: string
    city: string
    details: string
}

const columns: GridColDef[] = [
    {
        field: 'world', headerName: messages.citiesTable.world, filterable: false, flex: 1
    },
    {
        field: 'city', headerName: messages.citiesTable.city, filterable: true, flex: 1
    },
    {
        field: 'details', headerName: messages.citiesTable.details, filterable: false, flex: 5
    }
]


const mapToTableData = (player: Player): CityTableData[] => {
    return player.worlds.flatMap(world => {
        return world.cities.map(city => {
            return {
                id: city.key,
                world: world.name,
                city: city.name,
                details: city.details
            }
        })
    })
}

export const CitiesTable = ({player}: CitiesTableProps) => {
    if (!player) {
        return <div>{messages.common.noSelection}</div>
    }

    const rows: CityTableData[] = mapToTableData(player!)

    const onCellClicked = (params: GridCellParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => {
        console.log('onCellClicked', params)
    }

    const onRowClicked = (params: GridRowParams, event: MuiEvent<React.MouseEvent>, details: GridCallbackDetails) => {
        console.log('onRowClicked', params)
        console.log('onRowClicked event', event)
    }

    const onSelectionChange = (selectionModel: GridSelectionModel, details: GridCallbackDetails) => {
        console.log('selection model', selectionModel)
    }

    return (
        <div style={{height: 400, width: '100%'}}>
            <div style={{display: 'flex', height: '100%'}}>
                <div style={{flexGrow: 1}}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        showCellRightBorder={true}
                        showColumnRightBorder={true}
                        onRowClick={onRowClicked}
                        onSelectionModelChange={onSelectionChange}
                    />
                </div>
            </div>
        </div>
    )
}