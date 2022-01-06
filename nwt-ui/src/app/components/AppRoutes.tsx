import React from "react";
import {useRoutes} from "react-router-dom";
import {RouteObject} from "react-router";
import Layout from "app/components/Layout";
import CitiesView from "features/cities/components/CitiesView";
import SignInView from "features/user/components/SignInView";
import {NotFoundView} from "common/components/NotFoundView";
import WelcomeView from "common/components/WelcomeView";

export const AppLinks = {
    root: '/',
    signin: 'signin',
    cities: 'cities',
    welcome: 'welcome',
}

const nestedPaths: RouteObject[] = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: AppLinks.signin,
                element: <SignInView/>,
                index: true
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