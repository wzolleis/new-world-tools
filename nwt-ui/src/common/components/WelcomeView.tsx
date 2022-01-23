import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from "app/state/hooks";
import {loadData, selectData} from "features/data/state/dataSlice";
import {loadSelection, selectSelection} from "features/data/state/selectionSlice";
import {messages} from "common/i18n/messages";
import {Typography} from "@mui/material";

const WelcomeView = () => {
    // const {user} = useAppSelector(selectUser)
    const {user} = useAppSelector(selectData)
    const {selection} = useAppSelector(selectSelection)
    const dataAsString = JSON.stringify({user, selection})
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(loadData())
        dispatch(loadSelection())
    }, [dataAsString])

    return (
        <Typography variant="h3" color="text.primary">{messages.welcomePage.title}</Typography>
    )
}

export default WelcomeView