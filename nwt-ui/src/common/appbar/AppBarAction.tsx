import {IconType} from "common/types/iconType";
import React from "react";
import AppBarIcon from "common/appbar/AppBarIcon";
import AppBarButton from "common/appbar/AppBarButton";

interface AppBarActionProps {
    action: string
    label: string
    icon: IconType
    callback: (action: string) => void
}

const AppBarAction = ({action, label, icon, callback}: AppBarActionProps) => {
    return (
        <AppBarButton
            variant="outlined"
            startIcon={<AppBarIcon icon={icon}/>}
            onClick={() => callback(action)}
        >
            {label}
        </AppBarButton>
    )
}


export default AppBarAction