import React from 'react'
import {messages} from "common/i18n/messages";
import {Toolbar, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import LayoutConstants from "common/constants/layoutConstants";
import TopAppBar from "common/components/TopAppBar";
import {AppTheme} from "app/components/appTheme";

const useStyles = makeStyles((_: AppTheme) => {
    const {drawerWidth} = LayoutConstants

    return {
        title: {
            marginLeft: drawerWidth
        },
    }
})


const WelcomeView = () => {
    const classes = useStyles()
    return (
        <>
            <TopAppBar>
                <Toolbar>
                    <div className={classes.title}>
                        <Typography>{messages.welcomePage.appBarTitle}</Typography>
                    </div>
                </Toolbar>
            </TopAppBar>

            <Typography variant="body1" color="text.primary">{messages.welcomePage.description}</Typography>
        </>
    )
}

export default WelcomeView
