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
import {AppTheme} from "app/components/App";

export interface CityCardProps {
    city: City
}

const useStyles = makeStyles(
    {
        parentFlexRight: {
            display: "flex",
            justifyContent: "flex-end"
        },
        leftAlignItem: {
            marginRight: "auto"
        },
    }
)

interface CityCardActionsProps {
    classes: ClassNameMap<"parentFlexRight" | "leftAlignItem">
    handleExpandClick: () => void
    expanded: boolean
}

const CityCardActions = ({classes, handleExpandClick, expanded}: CityCardActionsProps ) => {
    return (
        <CardActions disableSpacing className={classes.parentFlexRight}>
            <IconButton className={classes.leftAlignItem}>
                <FavoriteIcon/>
            </IconButton>
            <IconButton onClick={handleExpandClick}>
                {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
            </IconButton>
        </CardActions>
    )
}

const CityCard = (props: CityCardProps) => {
    const [expanded, setExpanded] = React.useState(false);

    const classes: ClassNameMap<"parentFlexRight" | "leftAlignItem"> = useStyles()


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleMoreActionsClick = () => {

    }

    const {city} = props


    return (
        <Card>
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
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {city.details}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.parentFlexRight}>
                <IconButton className={classes.leftAlignItem}>
                    <FavoriteIcon/>
                </IconButton>
                <IconButton onClick={handleExpandClick}>
                    {expanded ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </IconButton>
            </CardActions>
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