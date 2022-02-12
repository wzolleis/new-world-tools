import React, {useEffect} from 'react'
import {useAppDispatch} from "app/state/hooks";
import {messages} from "common/i18n/messages";
import {Toolbar, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import LayoutConstants from "common/components/layoutConstants";
import AppBarContainer from "common/components/AppBarContainer";
import {loadData} from "features/data/state/dataSlice";
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
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(loadData())
    }, [])

    return (
        <>
            <AppBarContainer>
                <Toolbar>
                    <div className={classes.title}>
                        <Typography>{messages.welcomePage.appBarTitle}</Typography>
                    </div>
                </Toolbar>
            </AppBarContainer>

            <Typography variant="body1" color="text.primary">{messages.welcomePage.description}</Typography>
        </>
    )
}

export default WelcomeView