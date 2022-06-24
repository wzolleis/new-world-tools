import React from 'react'
import {useListCitiesQuery} from "common/api/queryApi";
import {useParams} from "react-router-dom";

const StorageView = () => {
    const {data: cities = []} = useListCitiesQuery()
    const params = useParams()
    const city = cities.find(city => city.key === params.cityKey)
    return <div>Items: {city?.storage.items.length || 0}</div>
}

export default StorageView