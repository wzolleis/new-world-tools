import React from "react";
import {useParams} from "react-router-dom";
import {useStateMachine} from "little-state-machine";
import {NotFoundView} from "common/components/NotFoundView";
import {messages} from "common/i18n/messages";


export const GameView = () => {
    const {state: {games}} = useStateMachine();
    const params = useParams();
    const id = params.id || 'unknown'
    const game = games.find(game => game.key === id)
    if (!game) {
        const label = messages.game.notFound(id)
        return < NotFoundView label={label}/>
    }
    return (
        <>
            <div>Game {id}</div>
        </>
    )
}