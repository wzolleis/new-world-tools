import React from "react";
import {Outlet, useParams} from "react-router-dom";

export const GameView = () => {
    const params = useParams();
    const id = params.id
    return (
        <>
            <div>Game {id}</div>
            <Outlet/>
        </>
    )
}