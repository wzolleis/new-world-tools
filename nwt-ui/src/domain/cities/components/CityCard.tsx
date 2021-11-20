import React from "react";
import {City} from "app/types/appTypes";
import {Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Typography} from "@mui/material";
import {red} from "@mui/material/colors";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';

export interface CityCardProps {
    city: City
}

const CityCard = (props: CityCardProps) => {
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
                    <IconButton aria-label="settings">
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
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default CityCard