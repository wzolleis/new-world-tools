import {IconType} from "common/types/iconType";
import {EditorType} from "common/types/editorType";
import AppBarButton from "common/appbar/AppBarButton";
import AppBarIcon from "common/appbar/AppBarIcon";
import React from "react";
import {City} from "common/types/commonTypes";

export interface InsertCityAppBarActionProps {
    label: string
    icon: IconType
    onOpenEditor: (editorType: EditorType, city: City) => void
    editorType: EditorType
    city: City
}

const CityAppBarAction = ({label, city, editorType, icon, onOpenEditor}: InsertCityAppBarActionProps) => {
    return (
        <AppBarButton
            variant="outlined"
            startIcon={<AppBarIcon icon={icon}/>}
            onClick={() => onOpenEditor(editorType, city)}
        >
            {label}
        </AppBarButton>
    )
}

export default CityAppBarAction