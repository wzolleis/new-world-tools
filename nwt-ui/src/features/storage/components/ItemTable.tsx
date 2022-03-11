import {City, CityStorage, Item, ObjectKey, TableActionClickHandler} from "common/types/commonTypes";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {messages} from "common/i18n/messages";
import {IconButton, ListItemIcon, ListItemText, Menu} from "@mui/material";
import * as React from "react";
import {useContext} from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuItem from "@mui/material/MenuItem";
import AppIcon from "common/components/AppIcon";
import {ItemActionHandler} from "features/storage/actions/ItemActionHandler";
import {ItemActionContext} from "features/cities/components/CitiesView";
import {EditorType} from "common/types/editorType";

interface CityItemTableProps {
    city: City,
    storage: CityStorage
}

interface CityItemTableRow {
    id: string
    name: string
    category: string
    quantity: number
}

const columns = (handleTableActionsClick: TableActionClickHandler): GridColDef[] => [
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
    {
        field: 'actions',
        headerName: messages.table.actions,
        filterable: false,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <IconButton
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleTableActionsClick(event, params.id as string)}>
                    <MoreHorizIcon/>
                </IconButton>
            )
        }
    }
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

interface ItemTableMenuProps {
    anchorEl: HTMLElement | null
    actionHandler: ItemActionHandler
    handleMenuClose: () => void
    item: Item
}

const ItemTableMenu = ({
                           anchorEl,
                           handleMenuClose,
                           item,
                           actionHandler: {onOpen},
                       }: ItemTableMenuProps) => {

    const handleMenuClick = (editorType: EditorType) => {
        handleMenuClose()
        onOpen(editorType, item)
    }

    return (
        <Menu
            id="item-table-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={() => handleMenuClick('edit')}>
                <ListItemIcon>
                    <AppIcon icon={"Edit"}/>
                </ListItemIcon>
                <ListItemText>{messages.crudActions.edit}</ListItemText>
            </MenuItem>
        </Menu>
    )
}

const ItemTable = ({storage}: CityItemTableProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedItem, setSelectedItem] = React.useState<undefined | Item>(undefined);
    const actionHandler = useContext(ItemActionContext)

    const items = storage?.items || []
    const rows: CityItemTableRow[] = mapToTableData(items)

    const handleTableActionsClick = (event: React.MouseEvent<HTMLButtonElement>, selected: ObjectKey) => {
        setAnchorEl(event.currentTarget)
        const mySelectedItem = items.find((item) => item.key === selected)
        setSelectedItem(mySelectedItem)
        console.log('handleTableActionClick', mySelectedItem)
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedItem(undefined)
    };

    return (
        <>
            <div style={{height: 400, width: '100%'}}>
                <div style={{display: 'flex', height: '100%'}}>
                    <div style={{flexGrow: 1}}>
                        <DataGrid
                            rows={rows}
                            columns={columns(handleTableActionsClick)}
                            pageSize={20}
                            rowsPerPageOptions={[20]}
                            showCellRightBorder={true}
                            showColumnRightBorder={true}
                        />
                    </div>
                    <ItemTableMenu anchorEl={anchorEl}
                                   actionHandler={actionHandler}
                                   handleMenuClose={handleMenuClose}
                                   item={selectedItem || ItemActionHandler.createNewItem()}
                    />
                </div>
            </div>
        </>
    )
}

export default ItemTable