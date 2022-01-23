import React, {useEffect} from 'react'
import {useAppDispatch} from "app/state/hooks";
import {loadData} from "features/data/state/dataSlice";
import {loadSelection} from "features/data/state/selectionSlice";
import {messages} from "common/i18n/messages";
import {Typography} from "@mui/material";

const WelcomeView = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(loadData())
        dispatch(loadSelection())
    }, [])

    return (
        <Typography variant="h3" color="text.primary">{messages.welcomePage.title}</Typography>
    )
}

export default WelcomeView