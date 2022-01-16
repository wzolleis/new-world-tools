import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "app/state/hooks";
import {loadData, selectData} from "features/data/state/dataSlice";

const WelcomeView = () => {
    // const {user} = useAppSelector(selectUser)
    const {user} = useAppSelector(selectData)
    const userAsString = JSON.stringify(user)
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(loadData())
    }, [userAsString])

    return (
        <div>Welcome {userAsString}</div>
    )
}

export default WelcomeView