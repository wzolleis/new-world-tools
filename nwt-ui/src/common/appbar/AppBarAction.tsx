import {IconType} from "common/types/iconType";
import React from "react";
import AppBarIcon from "common/appbar/AppBarIcon";
import AppBarButton from "common/appbar/AppBarButton";

interface AppBarActionProps {
    label: string
    icon: IconType
    callback: () => void
}

const AppBarAction = ({label, icon, callback}: AppBarActionProps) => {
    return (
        <AppBarButton
            variant="outlined"
            startIcon={<AppBarIcon icon={icon}/>}
            onClick={callback}
        >
            {label}
        </AppBarButton>
    )
}


export default AppBarAction