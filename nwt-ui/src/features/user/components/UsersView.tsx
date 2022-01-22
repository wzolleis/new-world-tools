import React from "react";

import {Grid} from "@mui/material";
import {AppSelection, User} from "common/types/commonTypes";
import {useAppDispatch, useAppSelector} from "app/state/hooks";
import UserCard from "features/user/components/UserCard";
import {selectData} from "features/data/state/dataSlice";
import {saveSelection, selectSelection, updateSelection} from "features/data/state/selectionSlice";

const UsersView = () => {
    const {user} = useAppSelector(selectData)
    const {selection} = useAppSelector(selectSelection)
    const dispatch = useAppDispatch()
    const onUpdateSelection = (selection: AppSelection) => {
        dispatch(saveSelection(selection))
        dispatch(updateSelection(selection))
    }


    return (
        <Grid sx={{flexGrow: 1}} container spacing={{xs: 2, md: 3}} columns={{xs: 1, sm: 1, md: 1}}>
            {user.map((user: User) => {
                return (
                    <Grid item key={user.key}>
                        <UserCard user={user} selection={selection} handleUpdateSelection={onUpdateSelection}/>
                    </Grid>
                )
            })}
        </Grid>
    )
}

export default UsersView