import React from "react";

import {Grid} from "@mui/material";
import {User} from "common/types/commonTypes";
import {useAppSelector} from "app/state/hooks";
import UserCard from "features/user/components/UserCard";
import {selectUser} from "features/user/state/userSlice";

const UsersView = () => {
    const {users} = useAppSelector(selectUser)

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

export default UsersView