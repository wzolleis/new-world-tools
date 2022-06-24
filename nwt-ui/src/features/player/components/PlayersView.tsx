import React from "react";
import {useListPlayersQuery} from "common/api/queryApi";

export const PlayersView = () => {
    const {data: players = []} = useListPlayersQuery()

    return (
        <>
            {
                players.map(player => {
                    return <div>{player.name}</div>
                })
            }
        </>
    )
}