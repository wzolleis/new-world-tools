import React from "react";
import {useAppSelector} from "app/state/hooks";
import {noDataMessage} from "common/i18n/messages";
import {Toolbar} from "@mui/material";
import AppBarContainer from "common/components/AppBarContainer";
import {selectPlayer} from "features/player/state/playerSlice";
import AppBarTitle from "common/components/AppBarTitle";

export const PlayersView = () => {
    const {player} = useAppSelector(selectPlayer)
    return (
        <>
            <AppBarContainer>
                <Toolbar>
                    <AppBarTitle title={player?.name || noDataMessage}/>
                </Toolbar>
            </AppBarContainer>
        </>
    )
}