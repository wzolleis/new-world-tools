import React from "react";
import {dataStates, Player, User} from "common/types/commonTypes";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Collapse,
    IconButton,
    List,
    ListItem,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {red} from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {messages} from "common/i18n/messages";

export interface UserCardProps {
    user: User
}

interface UserCardHeaderProps {
    handleMoreActionsClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    user: User
}

interface UserCardActionsProps {
    handleExpandClick: () => void
    expanded: boolean
}

const UserCardActions = ({handleExpandClick, expanded}: UserCardActionsProps) => {
    return (
        <CardActions disableSpacing sx={{display: "flex", justifyContent: "space-between"}}>
            <IconButton>
                <FavoriteIcon/>
            </IconButton>
            <IconButton onClick={handleExpandClick} sx={{marginLeft: "auto"}}
            >
                {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </IconButton>
        </CardActions>
    )
}

interface PlayerListProps {
    players: Player[]
}

const PlayerList = ({players}: PlayerListProps) => {
    return (
        <List>
            {
                players.map(player => {
                    return (
                        <ListItem key={player.key}>
                            {player.name}
                        </ListItem>
                    )
                })
            }
        </List>
    )
}

const UserCardContent = ({user, user: {players}}: UserCardProps) => {
    const detailsTxt = `${messages.userDetails.playersCount}: ${players.length}`
    const userActive = user.state === dataStates.active ? messages.userDetails.userActive : messages.userDetails.userNotActive

    return (
        <CardContent>
            <Typography paragraph>
                {userActive}
            </Typography>
            <Typography paragraph>
                {detailsTxt}
            </Typography>
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

interface UserCardMenuProps {
    open: boolean
    anchorEl: null | HTMLElement
    handleUserMenuClose: () => void
}

const UserCardMenu = ({handleUserMenuClose, anchorEl, open}: UserCardMenuProps) => {
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

interface UserCardDetailViewProps {
    players: Player[]
    expanded: boolean
}

const UserCardDetailView = ({players, expanded}: UserCardDetailViewProps) => {
    return (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography variant='h6'>{messages.userDetails.players}</Typography>
                <PlayerList players={players}/>
            </CardContent>
        </Collapse>
    )
}


const UserCard = ({user, user: {players}}: UserCardProps) => {
    const [expanded, setExpanded] = React.useState(false);
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
            <UserCardHeader user={user} handleMoreActionsClick={handleMoreActionsClick}/>
            <UserCardMenu open={open}
                          anchorEl={anchorEl}
                          handleUserMenuClose={handleUserMenuClose}
            />
            <UserCardContent user={user}/>
            <UserCardActions handleExpandClick={handleExpandClick}
                             expanded={expanded}
            />
            <UserCardDetailView
                players={players}
                expanded={expanded}
            />
        </Card>
    )
}

export default UserCard