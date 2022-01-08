import React from "react";
import {useRoutes} from "react-router-dom";
import {RouteObject} from "react-router";
import Layout from "app/components/Layout";
import CitiesView from "features/cities/components/CitiesView";
import {NotFoundView} from "common/components/NotFoundView";
import WelcomeView from "common/components/WelcomeView";
import UsersView from "features/user/components/UsersView";

export const AppLinks = {
    root: '/',
    cities: 'cities',
    users: 'users',
    welcome: 'welcome',
}

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
                path: AppLinks.welcome,
                element: <WelcomeView/>,
                index: true
            },
            {
                path: AppLinks.cities,
                element: <CitiesView/>
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