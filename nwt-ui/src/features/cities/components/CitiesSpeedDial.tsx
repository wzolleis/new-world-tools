import SaveIcon from "@mui/icons-material/Save";
import React from "react";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import {CommonActionType} from "common/types/commonTypes";

interface CitySpeedDialAction {
    name: CommonActionType
    icon: React.ReactElement
}

const actions: CitySpeedDialAction[] = [
    {icon: <SaveIcon/>, name: "save"},
];

interface CitiesSpeedDialProps {
    onAction: (action: CommonActionType) => void
}

const CitiesSpeedDial = ({onAction}: CitiesSpeedDialProps) => {
    return (
        <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{position: 'absolute', bottom: 16, right: 16}}
            icon={<SpeedDialIcon/>}
        >
            {actions.map((action) => (
                <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    onClick={() => onAction(action.name)}
                />
            ))}
        </SpeedDial>
    )
}

export default CitiesSpeedDial

