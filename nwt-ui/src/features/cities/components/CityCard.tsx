import React from "react";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Collapse,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import {red} from "@mui/material/colors";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {ClassNameMap, makeStyles} from "@mui/styles";
import {messages} from "common/i18n/messages";
import {City, Player} from "common/types/commonTypes";

const styles = {
    parentFlexSplit: {
        display: "flex",
        justifyContent: "space-between"
    },
    rightAlignItem: {
        marginLeft: "auto"
    }
}
type CityCardStyles = keyof typeof styles
const useStyles = makeStyles(styles)

export interface CityCardProps {
    city: City
}

interface CityCardHeaderProps extends CityCardProps {
    player: Player | undefined
    handleMoreActionsClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

interface CityCardActionsProps extends CityCardProps {
    classes: ClassNameMap<CityCardStyles>
    handleExpandClick: () => void
    expanded: boolean
}

const CityCardActions = ({classes, handleExpandClick, expanded}: CityCardActionsProps) => {
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

const CityCardContent = ({city: {details}}: CityCardProps) => {
    return (
        <CardContent>
            <Typography variant="body2" color="text.secondary">{details}</Typography>
        </CardContent>
    )
}

const CityCardHeader = ({city, player, handleMoreActionsClick}: CityCardHeaderProps) => {
    return (
        <CardHeader
            avatar={
                <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                    {city.name.charAt(0)}
                </Avatar>
            }
            action={
                <IconButton aria-label="settings" onClick={handleMoreActionsClick}>
                    <MoreVertIcon/>
                </IconButton>
            }
            title={city.name}
            subheader={player?.name || messages.common.noSelection}
        />
    )
}

interface CityCardMenuProps extends CityCardProps {
    open: boolean
    anchorEl: null | HTMLElement
    handleCityMenuClose: () => void
}

const CityCardMenu = ({city, handleCityMenuClose, anchorEl, open}: CityCardMenuProps) => {
    return (
        <Menu
            id="city-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCityMenuClose}
            MenuListProps={{'aria-labelledby': 'basic-button',}}
        >
            <MenuItem onClick={handleCityMenuClose}>{messages.crudActions.create}</MenuItem>
            <MenuItem onClick={handleCityMenuClose}>{messages.crudActions.edit}</MenuItem>
            <MenuItem onClick={handleCityMenuClose}>{messages.crudActions.save}</MenuItem>
            <MenuItem onClick={handleCityMenuClose}>{messages.crudActions.delete}</MenuItem>
        </Menu>
    )
}
interface CityCardDetailViewProps extends CityCardProps {
    expanded: boolean
}

const CityCardDetailView = ({city, expanded}: CityCardDetailViewProps) => {
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

const CityCard = (props: CityCardProps) => {
    const [expanded, setExpanded] = React.useState(false);
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMoreActionsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCityMenuClose = () => {
        setAnchorEl(null);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const {city} = props
    const player: Player = {
        name: 'dummy.player',
        key: '4031e661-91a5-4130-b61e-6c063cfe48ac',
        worlds: {}
    }

    return (
        <Card>
            <CityCardHeader player={player} city={city} handleMoreActionsClick={handleMoreActionsClick}/>
            <CityCardMenu city={city} open={open} anchorEl={anchorEl} handleCityMenuClose={handleCityMenuClose}/>
            <CityCardContent city={city}/>
            <CityCardActions city={city} classes={classes} handleExpandClick={handleExpandClick} expanded={expanded}/>
           <CityCardDetailView city={city} expanded={expanded}/>
        </Card>
    )
}

export default CityCard