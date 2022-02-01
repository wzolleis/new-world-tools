import React from "react";
import {useRoutes} from "react-router-dom";
import {RouteObject} from "react-router";
import CitiesView from "features/cities/components/CitiesView";
import {NotFoundView} from "common/components/NotFoundView";
import WelcomeView from "common/components/WelcomeView";
import UsersView from "features/user/components/UsersView";
import {PlayersView} from "features/player/components/PlayersView";
import {AppLinks} from "app/menu/data/appLinks";
import Layout from "common/components/Layout";
import StoragesView from "features/storage/components/StoragesView";

const nestedPaths: RouteObject[] = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: AppLinks.users,
                element: <UsersView/>,
            },
            {
                element: <WelcomeView/>,
                index: true
            },
            {
                path: AppLinks.cities,
                element: <CitiesView/>
            }, {

                path: AppLinks.storages,
                element: <StoragesView/>
            },
            {
                path: AppLinks.players,
                element: <PlayersView/>
            },
        ],
    },
    {
        path: "*",
        element: <NotFoundView/>
    }
]


export const AppRoutes = () => {
    return useRoutes(nestedPaths);
}