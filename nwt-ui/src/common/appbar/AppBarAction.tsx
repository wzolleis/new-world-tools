import {IconType} from "common/types/iconType";
import {Button} from "@mui/material";
import AppIcon from "common/components/AppIcon";
import React from "react";
import {useTheme} from "@mui/styles";
import {AppTheme} from "app/components/appTheme";


interface AppBarActionProps {
    action: string
    label: string
    icon: IconType
    callback: (action: string) => void
}

const AppBarAction = ({action, label, icon, callback}: AppBarActionProps) => {
    const theme = useTheme<AppTheme>()

    return (
        <Button
            variant="outlined"
            startIcon={<AppIcon icon={icon} color={theme.custom.appBar.color}/>}
            sx={{color: theme.custom.appBar.color}}
            onClick={() => callback(action)}
        >
            {label}
        </Button>
    )
}


export default AppBarAction