import React from "react";
import {City} from "app/types/appTypes";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader, Collapse,
    IconButton,
    Typography
} from "@mui/material";
import {red} from "@mui/material/colors";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import {ClassNameMap, makeStyles} from "@mui/styles";


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
    handleMoreActionsClick: () => void
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

const CityCardHeader = ({city, handleMoreActionsClick}: CityCardHeaderProps) => {
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
            subheader="TBD"
        />
    )
}

const CityCard = (props: CityCardProps) => {
    const [expanded, setExpanded] = React.useState(false);
    const classes = useStyles()

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleMoreActionsClick = () => {

    }

    const {city} = props


    return (
        <Card>
            <CityCardHeader city={city} handleMoreActionsClick={handleMoreActionsClick}/>
            <CityCardContent city={city}/>
            <CityCardActions city={city} classes={classes} handleExpandClick={handleExpandClick} expanded={expanded}/>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        More Info
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    )
}

export default CityCard