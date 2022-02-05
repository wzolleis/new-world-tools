import React from "react";
import {useAppSelector} from "app/state/hooks";
import {selectData} from "features/data/state/dataSlice";
import {selectSelection} from "features/data/state/selectionSlice";
import selectionService from "features/selection/service/selectionService";
import {messages} from "common/i18n/messages";
import {Toolbar, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {AppTheme} from "app/components/App";
import AppBarContainer from "common/components/AppBarContainer";
import LayoutConstants from "common/components/layoutConstants";

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
    const {user} = useAppSelector(selectData)
    const {selection} = useAppSelector(selectSelection)
    const {player} = selectionService.selectedData(user, selection)
    return (
        <>
            <AppBarContainer>
                <Toolbar>
                    <div className={classes.userName}>
                        <Typography>{player?.name || messages.common.noSelection}</Typography>
                    </div>
                </Toolbar>
            </AppBarContainer>
        </>
    )
}