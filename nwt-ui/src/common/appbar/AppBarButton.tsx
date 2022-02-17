import {AppTheme} from "app/components/appTheme";
import {Button, ButtonProps} from "@mui/material";
import {styled} from "@mui/material/styles";

const AppBarButton = styled(Button)<ButtonProps>(({theme}) => {
    const appTheme = theme as AppTheme
    return {
        marginRight: 5,
        color: appTheme.custom.appBarButtons.color
    }
})


export default AppBarButton