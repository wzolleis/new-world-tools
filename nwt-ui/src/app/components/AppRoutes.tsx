import React from "react";
import {Route, Routes} from "react-router-dom";
import {GamesView} from "domain/game/components/GamesView";
import {AboutView} from "app/components/AboutView";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<GamesView/>}/>
            <Route path="about" element={<AboutView/>}/>
        </Routes>
    )
}