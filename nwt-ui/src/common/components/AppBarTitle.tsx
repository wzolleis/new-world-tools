import {Typography} from "@mui/material";
import React, {PropsWithChildren} from "react";
import {makeStyles} from "@mui/styles";
import LayoutConstants from "common/constants/layoutConstants";
import {AppTheme} from "app/components/appTheme";

interface AppBarTitleProps {
    title?: string
}

const useStyles = makeStyles((_: AppTheme) => {
    const {drawerWidth} = LayoutConstants

    return {
        title: {
            marginLeft: drawerWidth,
            flexGrow: 1
        },
    }
})

const AppBarTitle: React.FC<PropsWithChildren<AppBarTitleProps>> = ({title, children}) => {
    const classes = useStyles()

    return (
        <div className={classes.title}>
            {children}
            {!!title && <Typography>{title}</Typography>}
        </div>
    )
}

export default AppBarTitle