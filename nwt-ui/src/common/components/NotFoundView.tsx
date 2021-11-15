import React from "react";
import {Alert} from "@mui/material";

export interface NotFoundViewProps {
    label: string
}

export const NotFoundView = (props: NotFoundViewProps) => {
    const {label} = props
    return (
        <Alert severity="warning">{label}</Alert>
    )
}