import {AppSelection, AppSelectionData, User} from "common/types/commonTypes";

const selectedData = (users: User[], selection: AppSelection): AppSelectionData => {
    const selectedUser = users.find(user => user.key === selection.user)
    const selectedPlayer = selectedUser?.player.find(player => player.key === selection.player)
    return {
        user: selectedUser,
        player: selectedPlayer
    }
}

export default {selectedData}