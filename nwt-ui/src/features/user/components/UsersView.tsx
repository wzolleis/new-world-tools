import React from "react";

import {Grid, Toolbar, Typography} from "@mui/material";
import {AppSelection, User} from "common/types/commonTypes";
import {useAppDispatch, useAppSelector} from "app/state/hooks";
import UserCard from "features/user/components/UserCard";
import {selectData} from "features/data/state/dataSlice";
import {saveSelection, selectSelection, updateSelection} from "features/data/state/selectionSlice";
import {makeStyles} from "@mui/styles";
import {AppTheme} from "app/components/App";
import LayoutConstants from "common/components/layoutConstants";
import AppBarContainer from "common/components/AppBarContainer";
import {messages} from "common/i18n/messages";
import selectionService from "features/selection/service/selectionService";

const useStyles = makeStyles((_: AppTheme) => {
    const {drawerWidth} = LayoutConstants

    return {
        userName: {
            marginLeft: drawerWidth
        },
    }
})

const UsersView = () => {
    const classes = useStyles()
    const {user: users} = useAppSelector(selectData)
    const {selection} = useAppSelector(selectSelection)
    const {user} = selectionService.selectedData(users, selection)

    const dispatch = useAppDispatch()
    const onUpdateSelection = (selection: AppSelection) => {
        dispatch(saveSelection(selection))
        dispatch(updateSelection(selection))
    }

    return (
        <>
            <AppBarContainer>
                <Toolbar>
                    <div className={classes.userName}>
                        <Typography>{user?.name || messages.usersView.noSelection(messages.menu.welcome)}</Typography>
                    </div>
                </Toolbar>
            </AppBarContainer>

            <Grid sx={{flexGrow: 1}} container spacing={{xs: 2, md: 3}} columns={{xs: 1, sm: 1, md: 1}}>
                {users.map((user: User) => {
                    return (
                        <Grid item key={user.key}>
                            <UserCard user={user} selection={selection} handleUpdateSelection={onUpdateSelection}/>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    )
}

export default UsersView