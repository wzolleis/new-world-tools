import {useNavigate} from "react-router-dom";
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import React from "react";
import {AppLinks} from "app/menu/data/appLinks";

export const NotFoundView = () => {
    const navigate = useNavigate()
    const navigateToHome = () => {
        navigate(AppLinks.root)
    }

    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '100vh'}}
        >
            <Grid item xs={3}>
                <Card sx={{maxWidth: 600}}>
                    <CardMedia
                        component="img"
                        height="800"
                        image="/404.jpg"
                        alt="Seite nicht gefunden"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="body1" component="div" color="text.primary">
                            404 - Not Found
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            This page isn't here. Maybe it moved. Or maybe it never existed.
                        </Typography>
                        <Typography variant="body1" color="text.secondary">Sorry. That's how it goes
                            sometimes.</Typography>
                    </CardContent>
                    <CardActions disableSpacing sx={{display: "flex", justifyContent: "space-between"}}>
                        <Button onClick={navigateToHome} size="large">Zurück</Button>
                        <Typography sx={{marginLeft: "auto"}} variant="subtitle2"><a
                            href='https://www.freepik.com'>www.freepik.com</a>.</Typography>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
}