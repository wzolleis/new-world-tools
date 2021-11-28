import React from "react";
import {useStateMachine} from "little-state-machine";
import {Game} from "common/types/commonTypes";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {ListItem} from "@mui/material";

interface GameListItem {
    game: Game,
    key: string
    title: string,
    icon?: string
}

const mapToGameListItem = (games: Game[]): GameListItem[] => {
    return games?.map(game => {
        return {
            game,
            key: game.key,
            title: game.name
        }
    }) || []
}


export const GamesView = () => {
    const {state: {games}} = useStateMachine();
    console.log('games: ', games.length)

    interface GameListItemProps {
        items: GameListItem[]
    }

    const mapListItems = (props: GameListItemProps): React.ReactElement[] => {
        const {items} = props

        return items.map((item, index) => {
            return (
                <ListItem key={item.key}>
                    <ListItemText primary={item.title}/>
                </ListItem>
            )
        })
    }

    const listItems = mapToGameListItem(games)

    return (
        <Box sx={{width: '100%', bgcolor: 'background.paper'}}>
            <List component="nav" aria-label="main mailbox folders">
                {mapListItems({items: listItems})}
            </List>
            <Divider/>
        </Box>
    )
}