import React from "react";
import {useRoutes} from "react-router-dom";
import {GamesView} from "domain/game/components/GamesView";
import {PlayersView} from "domain/player/components/PlayersView";
import {GameView} from "domain/game/components/GameView";
import {RouteObject} from "react-router";
import Layout from "app/components/Layout";

export const NotFoundView = () => {
    return (
        <main style={{padding: "1rem"}}>
            <p>There's nothing here!</p>
        </main>
    )
}

const nestedPaths: RouteObject[] = [
    {
        path: "/nw",
        element: <Layout/>,
        children: [
            {
                path: "games",
                element: <GamesView/>
            },
            {
                path: "games/:id/",
                element: <GameView/>
            },
            {
                path: "games/:id/players",
                element: <PlayersView/>
            },
            {
                path: "*",
                element: <NotFoundView/>
            }
        ]
    },
]


export const AppRoutes = () => {
    return useRoutes(nestedPaths);
}