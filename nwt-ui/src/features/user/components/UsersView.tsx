import React, {useEffect, useTransition} from "react";

import {Grid, Toolbar} from "@mui/material";
import {Player, User} from "common/types/commonTypes";
import {useAppDispatch, useAppSelector} from "app/state/hooks";
import UserCard from "features/user/components/UserCard";
import TopAppBar from "common/components/TopAppBar";
import {noDataMessage} from "common/i18n/messages";
import {listUser, selectUser} from "features/user/state/userSlice";
import AppBarTitle from "common/components/AppBarTitle";
import {listPlayer, selectPlayer} from "features/player/state/playerSlice";

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
    const [isPending, startTransition] = useTransition()
    const dispatch = useAppDispatch();
    useEffect(() => {
        startTransition(() => {
            dispatch(listPlayer())
            dispatch(listUser())
        })
    }, [dispatch])

    const {user, users} = useAppSelector(selectUser)
    const userName = `${user?.name || noDataMessage}`
    const {players} = useAppSelector(selectPlayer)

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