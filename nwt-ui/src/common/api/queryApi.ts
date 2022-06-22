import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import restApi from 'common/api/restApi'
import {City, CityStorage} from "common/types/commonTypes";

const baseURL = 'http://localhost:5000/api'


export const nwtApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: baseURL}),
    tagTypes: ['Cities', 'Storages'],
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
        listStorages: builder.query<Array<CityStorage>, void>({
            query: () => restApi.path.storages,
            providesTags: ['Storages']
        }),
        insertStorage: builder.mutation({
            query: (storage: CityStorage) => ({
                url: restApi.path.storages,
                method: 'POST',
                body: storage
            }),
            invalidatesTags: ['Storages']
        }),
        updateStorage: builder.mutation({
            query: (storage: CityStorage) => ({
                url: restApi.path.storage(storage.key),
                method: 'PUT',
                body: storage
            }),
            invalidatesTags: ['Storages']
        }),
        deleteStorage: builder.mutation({
            query: (storage: CityStorage) => ({
                url: restApi.path.storage(storage.key),
                method: 'DELETE'
            }),
            invalidatesTags: ['Storages']
        }),
    }),
})

export const {
    useListCitiesQuery,
    useListStoragesQuery,
    useInsertCityMutation,
    useUpdateCityMutation,
    useDeleteCityMutation,
} = nwtApi