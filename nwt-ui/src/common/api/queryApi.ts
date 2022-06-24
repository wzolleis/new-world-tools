import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {City, Player, User} from "common/types/commonTypes";

const baseURL = 'http://localhost:5000/api'

const restApi = {
    path: {
        users: `/users`,
        players: `/players`,
        cities: `/cities`,
        city: (key: string) => `/cities/${key}`,
    }
}

export const nwtApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: baseURL}),
    tagTypes: ['Cities', 'Storages', 'Players', 'Users'],
    endpoints: (builder) => ({
        listCities: builder.query<Array<City>, void>({
            query: () => restApi.path.cities,
            providesTags: ['Cities']
        }),
        insertCity: builder.mutation({
            query: (city: City) => ({
                url: restApi.path.cities,
                method: 'POST',
                body: city
            }),
            invalidatesTags: ['Cities']
        }),
        updateCity: builder.mutation({
            query: (city: City) => ({
                url: restApi.path.city(city.key),
                method: 'PUT',
                body: city
            }),
            invalidatesTags: ['Cities']
        }),
        deleteCity: builder.mutation({
            query: (city: City) => ({
                url: restApi.path.city(city.key),
                method: 'DELETE',
            }),
            invalidatesTags: ['Cities']
        }),
        listPlayers: builder.query<Array<Player>, void>({
            query: () => restApi.path.players,
            providesTags: ['Players']
        }),
        listUsers: builder.query<Array<User>, void>({
            query: () => restApi.path.users,
            providesTags: ['Users']
        }),
    }),
})

export const {
    useListCitiesQuery,
    useInsertCityMutation,
    useUpdateCityMutation,
    useDeleteCityMutation,
    useListPlayersQuery,
    useListUsersQuery
} = nwtApi