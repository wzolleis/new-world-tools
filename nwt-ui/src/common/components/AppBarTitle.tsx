import {Typography} from "@mui/material";
import React from "react";
import {makeStyles} from "@mui/styles";
import {AppTheme} from "app/components/App";
import LayoutConstants from "common/components/layoutConstants";

interface AppBarTitleProps {
    title: string
}

const useStyles = makeStyles((_: AppTheme) => {
    const {drawerWidth} = LayoutConstants

    return {
        title: {
            marginLeft: drawerWidth
        },
    }
})

const AppBarTitle = ({title}: AppBarTitleProps) => {
    const classes = useStyles()

    return (
        <div className={classes.title}>
            <Typography>{title}</Typography>
        </div>
    )
}

export default AppBarTitle