import {Typography} from "@mui/material";
import React, {PropsWithChildren} from "react";
import LayoutConstants from "common/constants/layoutConstants";
import {styled} from '@mui/material/styles';

interface AppBarTitleProps {
    title?: string
}

const {drawerWidth} = LayoutConstants
const Root = styled('div')(({theme}) => ({
    display: 'flex',
    marginLeft: drawerWidth,
    flexGrow: 1
}))

const AppBarTitle: React.FC<PropsWithChildren<AppBarTitleProps>> = ({title, children}) => {
    return (
        <Root>
            {children}
            {!!title && <Typography>{title}</Typography>}
        </Root>
    )
}

export default AppBarTitle