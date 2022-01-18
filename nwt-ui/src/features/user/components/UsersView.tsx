import React from "react";

import {Grid} from "@mui/material";
import {User} from "common/types/commonTypes";
import {useAppSelector} from "app/state/hooks";
import UserCard from "features/user/components/UserCard";
import {selectData} from "features/data/state/dataSlice";

const UsersView = () => {
    const {user} = useAppSelector(selectData)

    return (
        <Grid sx={{flexGrow: 1}} container spacing={{xs: 2, md: 3}} columns={{xs: 1, sm: 1, md: 1}}>
            {user.map((user: User) => {
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