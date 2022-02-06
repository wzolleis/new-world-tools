import React from "react";
import {dataStates, Player, User} from "common/types/commonTypes";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox,
    Collapse,
    FormControlLabel,
    IconButton,
    List,
    ListItem,
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
    user: User,
    players: Player[]
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

interface UserCardHeaderProps {
    handleMoreActionsClick: (event: React.MouseEvent<HTMLButtonElement>) => void
    user: User
}

interface UserCardActionsProps {
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

interface PlayerListProps {
    players: Player[]
}

const PlayerList = ({players}: PlayerListProps) => {
    return (
        <List>
            {
                players.map(player => {
                    const active = player.state === dataStates.active
                    return (
                        <ListItem key={player.key}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={active}
                                        disabled={true}
                                    />
                                }
                                label={player.name}
                            />
                        </ListItem>
                    )
                })
            }
        </List>
    )
}

const UserCardContent = ({user, players}: UserCardProps) => {
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
    user: User,
    players: Player[]
    expanded: boolean
}

const UserCardDetailView = ({user, players, expanded}: UserCardDetailViewProps) => {
    return (
        <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography variant='h6'>{messages.userDetails.players}</Typography>
                <PlayerList players={players}/>
            </CardContent>
        </Collapse>
    )
}


const UserCard = ({user, players}: UserCardProps) => {
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
            <UserCardHeader user={user} handleMoreActionsClick={handleMoreActionsClick}/>
            <UserCardMenu open={open}
                          anchorEl={anchorEl}
                          handleUserMenuClose={handleUserMenuClose}
            />
            <UserCardContent user={user} players={players}/>
            <UserCardActions classes={classes}
                             handleExpandClick={handleExpandClick}
                             expanded={expanded}
            />
            <UserCardDetailView
                user={user}
                players={players}
                expanded={expanded}
            />
        </Card>
    )
}

export default UserCard