import React from "react";
import {useRoutes} from "react-router-dom";
import {RouteObject} from "react-router";
import Layout from "app/components/Layout";
import CitiesView from "domain/cities/components/CitiesView";
import WelcomeView from "common/components/WelcomeView";

export const NotFoundView = () => {
    return (
        <main style={{padding: "1rem"}}>
            <p>There's nothing here!</p>
        </main>
    )
}

const nestedPaths: RouteObject[] = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: 'welcome',
                element: <WelcomeView/>,
            },
            {
                path: "cities",
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