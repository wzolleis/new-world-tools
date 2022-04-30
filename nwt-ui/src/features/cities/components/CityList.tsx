import {useLoadCities} from "features/cities/hooks/cityHooks"
import {useAppDispatch, useAppSelector} from "app/state/hooks";
import {listCity, selectCity} from "features/cities/state/citiesSlice";
import {City} from "common/types/commonTypes";
import React, {useEffect} from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {messages} from "common/i18n/messages";
import {AppTheme} from "app/components/appTheme";
import {Avatar, CardHeader, Grid} from "@mui/material";
import {useTheme} from "@mui/material/styles";


interface CityItemProps {
    city: City
}

const CityItem = ({city}: CityItemProps) => {
    const theme = useTheme<AppTheme>()
    const iconColor = theme.custom.menuIcons.color
    return (
        <Card variant={"outlined"}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: iconColor}}>
                        {city.name.charAt(0)}
                    </Avatar>
                }
                title={city.name}
                titleTypographyProps={{
                    variant: "subtitle1"
                }}
            />
            <CardContent>
                <Typography maxHeight={100} minHeight={100} minWidth={300} maxWidth={300} variant={"subtitle2"}
                            paragraph>{city.details}</Typography>
            </CardContent>
            <CardActions>
                <Button size="small">{messages.common.showDetailsButton}</Button>
            </CardActions>
        </Card>
    )
}

const CityList = () => {
    const dispatch = useAppDispatch();
    const {cities} = useAppSelector(selectCity)
    useEffect(() => {
        dispatch(listCity())
    }, [dispatch])

    useLoadCities([cities.length])

    return (
        <Grid sx={{flexGrow: 1}} container spacing={{xs: 2, md: 3}} columns={{xs: 1, sm: 1, md: 1}}>
            {
                cities.map(city => {

                    return (
                        <Grid item key={city.key}>
                            <CityItem city={city}/>
                        </Grid>)
                })
            }
        </Grid>
    )
}

export default CityList