import {IconType} from "common/types/iconType";
import {EditorType} from "common/types/editorType";
import AppBarButton from "common/appbar/AppBarButton";
import AppBarIcon from "common/appbar/AppBarIcon";
import React from "react";
import {Item} from "common/types/commonTypes";

export interface InsertItemAppBarActionProps {
    label: string
    icon: IconType
    onOpenEditor: (editorType: EditorType, item: Item) => void
    editorType: EditorType
    item: Item
}

const ItemAppBarAction = ({label, item, editorType, icon, onOpenEditor}: InsertItemAppBarActionProps) => {
    return (
        <AppBarButton
            variant="outlined"
            startIcon={<AppBarIcon icon={icon}/>}
            onClick={() => onOpenEditor(editorType, item)}
        >
            {label}
        </AppBarButton>
    )
}

export default ItemAppBarAction