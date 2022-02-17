import React from "react";

import {Grid, Toolbar} from "@mui/material";
import {User} from "common/types/commonTypes";
import {useAppSelector} from "app/state/hooks";
import UserCard from "features/user/components/UserCard";
import TopAppBar from "common/components/TopAppBar";
import {noDataMessage} from "common/i18n/messages";
import {selectUser} from "features/user/state/userSlice";
import AppBarTitle from "common/components/AppBarTitle";
import {selectPlayer} from "features/player/state/playerSlice";

const UsersView = () => {
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
        </>
    )
}

export default UsersView