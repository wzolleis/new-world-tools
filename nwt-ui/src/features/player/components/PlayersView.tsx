import React from "react";
import {useAppSelector} from "app/state/hooks";
import {selectData} from "features/data/state/dataSlice";
import {selectSelection} from "features/data/state/selectionSlice";
import selectionService from "features/selection/service/selectionService";

export const PlayersView = () => {
    const {user} = useAppSelector(selectData)
    const {selection} = useAppSelector(selectSelection)
    const selectedData = selectionService.selectedData(user, selection)

    return (
        <div>{`Spieler: ${selectedData.player?.name || 'Kein Spieler ausgewählt'}`}</div>
    )
}