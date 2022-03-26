import {City, CityStorage, Item, ObjectKey, TableActionClickHandler} from "common/types/commonTypes";
import {DataGrid, GridColDef, GridRenderCellParams} from "@mui/x-data-grid";
import {messages} from "common/i18n/messages";
import {Alert, AlertProps, IconButton, ListItemIcon, ListItemText, Menu, Snackbar} from "@mui/material";
import * as React from "react";
import {useContext} from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import MenuItem from "@mui/material/MenuItem";
import AppIcon from "common/components/AppIcon";
import {ItemActionHandler} from "features/storage/actions/ItemActionHandler";
import {ActionHandlerContext} from "features/cities/components/CitiesView";
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
        editable: true,
        flex: 1,
    },
    {
        field: 'quantity', headerName: messages.citiesItemsTable.quantity, filterable: false, flex: 1, editable: true
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

const mapOneItemToTableData = (item: Item): CityItemTableRow => {
    return {
        id: item.key,
        name: item.name,
        category: item.category,
        quantity: item.quantity
    }
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
    const {itemActionHandler} = useContext(ActionHandlerContext)
    const [snackbar, setSnackbar] = React.useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    const items = storage?.items || []
    const rows: CityItemTableRow[] = items.map(mapOneItemToTableData)

    const handleTableActionsClick = (event: React.MouseEvent<HTMLButtonElement>, selected: ObjectKey) => {
        setAnchorEl(event.currentTarget)
        const mySelectedItem = items.find((item) => item.key === selected)
        setSelectedItem(mySelectedItem)
    }
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedItem(undefined)
    };

    const handleUpdateRow = React.useCallback((values: Partial<CityItemTableRow>) => {
        const item: Item | undefined = items.find(item => item.key === values.id)
        if (!!item) {
            const toUpdate: Item = {
                ...item,
                quantity: values.quantity || item.quantity,
                name: values.name || item.name,
            }
            itemActionHandler.onUpdate(toUpdate)
            setSnackbar({children: messages.success.updated(toUpdate.name), severity: 'success'});
            return Promise.resolve(mapOneItemToTableData(toUpdate))
        } else {
            setSnackbar({children: 'Error while saving Item', severity: 'error'});
            return Promise.reject(messages.errors.itemNotFound(values.id))
        }
    }, [items, itemActionHandler])

    return (
        <>
            <div style={{height: 400, width: '100%'}}>
                <div style={{display: 'flex', height: '100%'}}>
                    <div style={{flexGrow: 1}}>
                        <DataGrid
                            experimentalFeatures={{newEditingApi: true}}
                            rows={rows}
                            columns={columns(handleTableActionsClick)}
                            pageSize={20}
                            rowsPerPageOptions={[20]}
                            showCellRightBorder={true}
                            showColumnRightBorder={true}
                            processRowUpdate={handleUpdateRow}
                        />
                    </div>
                    <ItemTableMenu anchorEl={anchorEl}
                                   actionHandler={itemActionHandler}
                                   handleMenuClose={handleMenuClose}
                                   item={selectedItem || ItemActionHandler.createNewItem()}
                    />
                </div>
                {!!snackbar && (
                    <Snackbar
                        open
                        anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                        onClose={handleCloseSnackbar}
                        autoHideDuration={6000}
                    >
                        <Alert {...snackbar} onClose={handleCloseSnackbar}/>
                    </Snackbar>
                )}
            </div>
        </>
    )
}

export default ItemTable