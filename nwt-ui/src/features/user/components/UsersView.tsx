import React from "react";

import {Grid, Toolbar} from "@mui/material";
import {User} from "common/types/commonTypes";
import {useAppSelector} from "app/state/hooks";
import UserCard from "features/user/components/UserCard";
import AppBarContainer from "common/components/AppBarContainer";
import {noDataMessage} from "common/i18n/messages";
import {selectUser} from "features/user/state/userSlice";
import AppBarTitle from "common/components/AppBarTitle";

const UsersView = () => {
    const {user, users} = useAppSelector(selectUser)
    // const dispatch = useAppDispatch()
    // const onUpdateSelection = () => {
    // dispatch(saveSelection(selection))
    // dispatch(updateSelection(selection))
    // }

    const userName = `${user?.name || noDataMessage}`

    return (
        <>
            <AppBarContainer>
                <Toolbar>
                    <AppBarTitle title={userName}/>
                </Toolbar>
            </AppBarContainer>

            <Grid sx={{flexGrow: 1}} container spacing={{xs: 2, md: 3}} columns={{xs: 1, sm: 1, md: 1}}>
                {users.map((user: User) => {
                    return (
                        <Grid item key={user.key}>
                            <UserCard user={user}/>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

export default UsersView