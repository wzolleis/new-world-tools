import {SvgIconProps} from "@mui/material";
import AppIcon from "common/components/AppIcon";
import {styled} from "@mui/material/styles";
import {AppTheme} from "app/components/appTheme";

const AppBarIcon = styled(AppIcon)<SvgIconProps>(({theme}) => {
    const appTheme = theme as AppTheme
    return {
        color: appTheme.custom.appBarIcons.color
    }
})

export default AppBarIcon