import React from 'react'
import {messages} from "common/i18n/messages";
import {Toolbar, Typography} from "@mui/material";
import LayoutConstants from "common/constants/layoutConstants";
import TopAppBar from "common/components/TopAppBar";
import {styled} from "@mui/material/styles";

const {drawerWidth} = LayoutConstants
const Root = styled('div')(() => ({
    display: 'flex',
    marginLeft: drawerWidth,
}))

const WelcomeView = () => {
    return (
        <>
            <TopAppBar>
                <Toolbar>
                    <Root>
                        <Typography>{messages.welcomePage.appBarTitle}</Typography>
                    </Root>
                </Toolbar>
            </TopAppBar>

            <Typography variant="body1" color="text.primary">{messages.welcomePage.description}</Typography>
        </>
    )
}

export default WelcomeView
