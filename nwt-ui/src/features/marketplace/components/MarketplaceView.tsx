import TopAppBar from "common/components/TopAppBar";
import {Toolbar} from "@mui/material";
import AppBarTitle from "common/components/AppBarTitle";
import {messages} from "common/i18n/messages";
import React from "react";

const MarketplaceView = () => {
    return (
        <>
            <TopAppBar>
                <Toolbar>
                    <AppBarTitle title={messages.menu.marketplace}/>
                </Toolbar>
            </TopAppBar>
            <div>Economy</div>
        </>
    )
}

export default MarketplaceView