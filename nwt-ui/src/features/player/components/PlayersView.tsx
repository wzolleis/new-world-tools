import React from "react";
import {useAppSelector} from "app/state/hooks";
import {noDataMessage} from "common/i18n/messages";
import {Toolbar, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {AppTheme} from "app/components/App";
import AppBarContainer from "common/components/AppBarContainer";
import LayoutConstants from "common/components/layoutConstants";
import {selectPlayer} from "features/player/state/playerSlice";

const useStyles = makeStyles((_: AppTheme) => {
    const {drawerWidth} = LayoutConstants

    return {
        userName: {
            marginLeft: drawerWidth
        },
    }
})

export const PlayersView = () => {
    const classes = useStyles()
    const {player} = useAppSelector(selectPlayer)
    return (
        <>
            <AppBarContainer>
                <Toolbar>
                    <div className={classes.userName}>
                        <Typography>{player?.name || noDataMessage}</Typography>
                    </div>
                </Toolbar>
            </AppBarContainer>
        </>
    )
}