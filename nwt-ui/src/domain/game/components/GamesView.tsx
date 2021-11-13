import React from "react";
import {useStateMachine} from "little-state-machine";
import {Game} from "app/types/appTypes";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';

interface  GameListItem {
    game: Game,
    key: string
    title: string,
    icon?: string
}

const mapToGameListItem = (games: Game[]): GameListItem[] => {
    return games.map(game => {
        return {
            game,
            key: game.key,
            title: game.name
        }
    })
}

export const GamesView = () => {
    const {state: {games}} = useStateMachine();
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event: React.MouseEvent, index: number) => {
        console.log("selected index=", selectedIndex)
        setSelectedIndex(index);
    };

    const listItems = mapToGameListItem(games)

    return (
        <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            <List component="nav" aria-label="main mailbox folders">
                {
                    listItems.map(item => {
                        return <ListItemButton
                            key={item.key}
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0)}
                        >
                            <ListItemIcon>
                                <InboxIcon/>
                            </ListItemIcon>
                            <ListItemText primary={item.title}/>
                        </ListItemButton>
                    })
                }
            </List>
            <Divider/>
        </Box>
    )
}