import React from "react";
import {AppSelection, Player, User} from "common/types/commonTypes";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader, Checkbox,
    Collapse, FormControlLabel,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import {ClassNameMap, makeStyles} from "@mui/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {red} from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {messages} from "common/i18n/messages";

export interface UserCardProps {
    user: User
    selection: AppSelection
    handleUpdateSelection: (selection: AppSelection) => void
}

const styles = {
    parentFlexSplit: {
        display: "flex",
        justifyContent: "space-between"
    },
    rightAlignItem: {
        marginLeft: "auto"
    }
}
type UserCardStyles = keyof typeof styles
const useStyles = makeStyles(styles)

interface UserCardHeaderProps extends UserCardProps {
    handleMoreActionsClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

interface UserCardActionsProps extends UserCardProps {
    classes: ClassNameMap<UserCardStyles>
    handleExpandClick: () => void
    expanded: boolean
}

const UserCardActions = ({classes, handleExpandClick, expanded}: UserCardActionsProps) => {
    return (
        <CardActions disableSpacing className={classes.parentFlexSplit}>
            <IconButton>
                <FavoriteIcon/>
            </IconButton>
            <IconButton onClick={handleExpandClick} className={classes.rightAlignItem}
            >
                {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </IconButton>
        </CardActions>
    )
}

const UserCardContent = ({user: {player}, selection, handleUpdateSelection}: UserCardProps) => {
    const handleChange = (player: Player, event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedPlayer = event.target.checked ? player : undefined
        handleUpdateSelection({
            ...selection,
            player: selectedPlayer?.key
        })
    };

    const checked = !!selection.player

    return (
        <CardContent>
            {
                player.map((p => {
                    return (
                        <FormControlLabel
                            key={p.key}
                            control={
                                <Checkbox
                                    checked={checked}
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChange(p, event)}
                                    inputProps={{'aria-label': 'controlled'}}
                                />
                            }
                            label={p.name}
                        />
                    )
                }))
            }
        </CardContent>
    )
}

const UserCardHeader = ({user, handleMoreActionsClick}: UserCardHeaderProps) => {

    return (
        <CardHeader
            avatar={
                <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                    {user.name.charAt(0)}
                </Avatar>
            }
            action={
                <IconButton aria-label="settings" onClick={handleMoreActionsClick}>
                    <MoreVertIcon/>
                </IconButton>
            }
            title={user.name}
        />
    )
}

interface UserCardMenuProps extends UserCardProps {
    open: boolean
    anchorEl: null | HTMLElement
    handleUserMenuClose: () => void
}

const UserCardMenu = ({user, handleUserMenuClose, anchorEl, open}: UserCardMenuProps) => {
    return (
        <Menu
            id="User-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleUserMenuClose}
            MenuListProps={{'aria-labelledby': 'basic-button',}}
        >
            <MenuItem onClick={handleUserMenuClose}>{messages.crudActions.create}</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>{messages.crudActions.edit}</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>{messages.crudActions.save}</MenuItem>
            <MenuItem onClick={handleUserMenuClose}>{messages.crudActions.delete}</MenuItem>
        </Menu>
    )
}

interface UserCardDetailViewProps extends UserCardProps {
    expanded: boolean
}

const UserCardDetailView = ({user, expanded}: UserCardDetailViewProps) => {
    return (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography paragraph>
                    Anzahl Items: {0}
                </Typography>
            </CardContent>
        </Collapse>
    )
}


const UserCard = ({user, selection, handleUpdateSelection}: UserCardProps) => {
    const [expanded, setExpanded] = React.useState(false);

    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMoreActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleUserMenuClose = () => {
        setAnchorEl(null);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card>
            <UserCardHeader user={user}
                            selection={selection}
                            handleMoreActionsClick={handleMoreActionsClick}
                            handleUpdateSelection={handleUpdateSelection}
            />
            <UserCardMenu user={user}
                          selection={selection}
                          open={open}
                          anchorEl={anchorEl}
                          handleUserMenuClose={handleUserMenuClose}
                          handleUpdateSelection={handleUpdateSelection}
            />
            <UserCardContent user={user}
                             selection={selection}
                             handleUpdateSelection={handleUpdateSelection}
            />
            <UserCardActions user={user}
                             selection={selection}
                             classes={classes}
                             handleExpandClick={handleExpandClick}
                             handleUpdateSelection={handleUpdateSelection}
                             expanded={expanded}
            />
            <UserCardDetailView
                user={user}
                selection={selection}
                expanded={expanded}
                handleUpdateSelection={handleUpdateSelection}
            />
        </Card>
    )
}

export default UserCard