import {City, Item} from "common/types/commonTypes";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {messages} from "common/i18n/messages";

interface CityItemTableProps {
    city: City
}

interface CityItemTableRow {
    id: string
    name: string
    category: string
    quantity: number
}

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: messages.citiesItemsTable.name,
        filterable: false,
        flex: 1,
    },
    {
        field: 'quantity', headerName: messages.citiesItemsTable.quantity, filterable: false, flex: 1
    },
    {
        field: 'category', headerName: messages.citiesItemsTable.category, filterable: false, flex: 1
    },
]

const mapToTableData = (items: Item[]): CityItemTableRow[] => {
    return items.map((item: Item) => {
        return {
            id: item.key,
            name: item.name,
            category: item.category,
            quantity: item.quantity
        }
    })
}

const CityItemTable = ({city}: CityItemTableProps) => {
    const items = city.lager.items
    const rows: CityItemTableRow[] = mapToTableData(items)

    return (
        <>
            <div style={{height: 400, width: '100%'}}>
                <div style={{display: 'flex', height: '100%'}}>
                    <div style={{flexGrow: 1}}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={20}
                            rowsPerPageOptions={[20]}
                            showCellRightBorder={true}
                            showColumnRightBorder={true}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CityItemTable