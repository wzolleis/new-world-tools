import React from "react";
import {useRoutes} from "react-router-dom";
import {RouteObject} from "react-router";
import CitiesView from "features/cities/components/CitiesView";
import {NotFoundView} from "common/components/NotFoundView";
import WelcomeView from "common/components/WelcomeView";
import UsersView from "features/user/components/UsersView";
import {AppLinks} from "app/menu/data/appLinks";
import Layout from "common/components/Layout";
import CityDetailsView from "features/cities/components/CityDetailsView";
import StorageView from 'features/storage/components/StorageView'
import MarketplaceView from "features/marketplace/components/MarketplaceView";

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
                element: <CitiesView/>,
            },
            {
                path: AppLinks.marketplace,
                element: <MarketplaceView/>,
            },
            {
                path: `${AppLinks.cities}/:key`,
                element: <CityDetailsView/>
            },
            {
                path: `${AppLinks.cities}/:cityKey/storage/:storageKey`,
                element: <StorageView/>
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