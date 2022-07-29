import TopAppBar from "common/components/TopAppBar";
import {Avatar, CardHeader, Grid, Toolbar} from "@mui/material";
import AppBarTitle from "common/components/AppBarTitle";
import {messages} from "common/i18n/messages";
import React from "react";
import {useListMarketPlaceQuery} from "common/api/queryApi";
import {useTheme} from "@mui/material/styles";
import {AppTheme} from "app/components/appTheme";
import {AppLinksCreator} from "app/menu/data/appLinks";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {Link as RouterLink} from "react-router-dom";
import {MarketPlaceItem} from "common/types/commonTypes";

interface MarketPlaceItemProps {
    item: MarketPlaceItem
}

const MarketPlaceItemView = ({item}: MarketPlaceItemProps) => {
    const theme = useTheme<AppTheme>()
    const iconColor = theme.custom.menuIcons.color
    const detailsLink = AppLinksCreator.createMarketPlaceItemDetailsLink(item)
    return (
        <Card variant={"outlined"}>
            <CardHeader
                avatar={
                    <Avatar sx={{bgcolor: iconColor}}>
                        {item.name.charAt(0)}
                    </Avatar>
                }
                title={item.name}
                titleTypographyProps={{
                    variant: "subtitle1"
                }}
            />
            <CardContent>
                <Typography maxHeight={100} minHeight={100} minWidth={300} maxWidth={300} variant={"subtitle2"}
                            paragraph>{`Preise: ${item.prices.length}`}</Typography>
            </CardContent>
            <CardActions>
                <Button component={RouterLink} to={detailsLink}
                        size="small">{messages.common.showDetailsButton}</Button>
            </CardActions>
        </Card>
    )
}


const MarketplaceView = () => {
    const {data: marketPlace = {items: []}, isLoading} = useListMarketPlaceQuery()
    return (
        <>
            {isLoading && <div>loading...</div>}
            <TopAppBar>
                <Toolbar>
                    <AppBarTitle title={messages.menu.marketplace}/>
                </Toolbar>
            </TopAppBar>
            <Grid sx={{flexGrow: 1}} container direction={"column"} spacing={{xs: 2, md: 3}}
                  columns={{xs: 1, sm: 1, md: 1}}>
                <Grid item>
                    <Grid sx={{flexGrow: 1}} container spacing={{xs: 2, md: 3}} columns={{xs: 1, sm: 1, md: 1}}>
                        {
                            marketPlace.items.map(item => {
                                return (
                                    <Grid item key={item.key}>
                                        <MarketPlaceItemView item={item}/>
                                    </Grid>)
                            })
                        }
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default MarketplaceView