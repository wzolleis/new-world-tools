import React from "react";

import {Grid, Toolbar} from "@mui/material";
import {Player, User} from "common/types/commonTypes";
import UserCard from "features/user/components/UserCard";
import TopAppBar from "common/components/TopAppBar";
import AppBarTitle from "common/components/AppBarTitle";
import {useListPlayersQuery, useListUsersQuery} from "common/api/queryApi";

interface UserGridProps {
    users: User[]
    players: Player[]
    pending: boolean
}

const UserGrid = ({pending, users, players}: UserGridProps) => {
    if (pending) {
        return <div>Loading....</div>
    }

    return (
        <Grid sx={{flexGrow: 1}} container spacing={{xs: 2, md: 3}} columns={{xs: 1, sm: 1, md: 1}}>
            {users.map((user: User) => {
                const assignedPlayer = players.filter(player => player.user === user.key)
                return (
                    <Grid item key={user.key}>
                        <UserCard user={user} players={assignedPlayer}/>
                    </Grid>
                )
            })}
        </Grid>
    )
}

const UsersView = () => {
    const {data: players = [], isLoading: playerLoading} = useListPlayersQuery()
    const {data: users = [], isLoading: userLoading} = useListUsersQuery()
    const isPending = playerLoading || userLoading

    const user = users.find(user => user.key == '4031e661-91a5-4130-b61e-6c063cfe48ac')
    const userName = user?.name || 'undefined user'
    return (
        <>
            <TopAppBar>
                <Toolbar>
                    <AppBarTitle title={userName}/>
                </Toolbar>
            </TopAppBar>
            <UserGrid users={users} players={players} pending={isPending}/>
        </>
    )
}

export default UsersView