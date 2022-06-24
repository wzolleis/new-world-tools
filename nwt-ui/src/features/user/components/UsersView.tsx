import React from "react";

import {Grid, Toolbar} from "@mui/material";
import {User} from "common/types/commonTypes";
import UserCard from "features/user/components/UserCard";
import TopAppBar from "common/components/TopAppBar";
import AppBarTitle from "common/components/AppBarTitle";
import {useListUsersQuery} from "common/api/queryApi";

import dataKeys from 'app/state/objectKeys'

interface UserGridProps {
    users: User[]
    pending: boolean
}

const UserGrid = ({pending, users}: UserGridProps) => {
    if (pending) {
        return <div>Loading....</div>
    }

    return (
        <Grid sx={{flexGrow: 1}} container spacing={{xs: 2, md: 3}} columns={{xs: 1, sm: 1, md: 1}}>
            {users.map((user: User) => {
                return (
                    <Grid item key={user.key}>
                        <UserCard user={user}/>
                    </Grid>
                )
            })}
        </Grid>
    )
}

const UsersView = () => {
    const {data: users = [], isLoading: userLoading} = useListUsersQuery()
    const isPending = userLoading

    const user = users.find(user => user.key === dataKeys.users.dschaeck)
    const userName = user?.name || 'undefined user'
    return (
        <>
            <TopAppBar>
                <Toolbar>
                    <AppBarTitle title={userName}/>
                </Toolbar>
            </TopAppBar>
            <UserGrid users={users} pending={isPending}/>
        </>
    )
}

export default UsersView