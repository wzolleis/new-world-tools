import {useTheme} from "@mui/material/styles";
import {AppTheme} from "app/components/appTheme";
import Card from "@mui/material/Card";
import {Avatar, CardHeader, Grid, Toolbar} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {messages} from "common/i18n/messages";
import React, {useEffect} from "react";
import {City} from "common/types/commonTypes";
import {useAppDispatch, useAppSelector} from "app/state/hooks";
import {listCity, selectCity} from "features/cities/state/citiesSlice";
import {Link as RouterLink, Outlet} from "react-router-dom";
import {AppLinksCreator} from "app/menu/data/appLinks";
import AppBarTitle from "common/components/AppBarTitle";
import TopAppBar from "common/components/TopAppBar";

interface CityItemProps {
    city: City
}

const CityItem = ({city}: CityItemProps) => {
    const theme = useTheme<AppTheme>()
    const iconColor = theme.custom.menuIcons.color
    const detailsLink = AppLinksCreator.createCityDetailsLink(city)
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
                <Button component={RouterLink} to={detailsLink}
                        size="small">{messages.common.showDetailsButton}</Button>
            </CardActions>
        </Card>
    )
}

const CitiesView = () => {
    const dispatch = useAppDispatch();
    const {cities} = useAppSelector(selectCity)
    useEffect(() => {
        dispatch(listCity())
    }, [dispatch])

    return (
        <>
            <TopAppBar>
                <Toolbar>
                    <AppBarTitle title={messages.menu.cities}/>
                </Toolbar>
            </TopAppBar>

            <Grid sx={{flexGrow: 1}} container direction={"column"} spacing={{xs: 2, md: 3}}
                  columns={{xs: 1, sm: 1, md: 1}}>
                <Grid item>
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
                </Grid>
                <Grid item>
                    <Outlet/>
                </Grid>
            </Grid>
        </>
    )
}

export default CitiesView