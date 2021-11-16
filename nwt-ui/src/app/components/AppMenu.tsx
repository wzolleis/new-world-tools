export const dummy = 'dummy'


// import React from "react";
// import ListItem from "@mui/material/ListItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import ListItemText from "@mui/material/ListItemText";
// import List from "@mui/material/List";
// import {Link} from "@mui/material";
//
// interface MenuEntry {
//     label: string
//     link: string
//     icon?: string
//     subMenu?: MenuEntry[]
// }
//
// const AppMenuEntries: MenuEntry[] = [
//     {
//         label: 'Games',
//         link: '/games',
//         subMenu: [
//             {
//                 label: 'New World',
//                 link: '/games/01/'
//             }
//         ]
//     },
//     {
//         label: 'Games',
//         link: '/games/:id/players'
//     },
// ]
//
// export const AppMenu = () => {
//     return (
//         <List>
//             {['Games', 'Players', 'Cities'].map((text, index) => (
//                 <ListItem button key={text}>
//                     <ListItemIcon>
//                         {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
//                     </ListItemIcon>
//                     <Link href="/games">
//                         <ListItemText primary={text}/>
//                     </Link>
//                     <ListItem button key={text}>
//                         <ListItemIcon>
//                             {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
//                         </ListItemIcon>
//                         <Link href="/games/inner">
//                             <ListItemText primary={'inner list item'}/>
//                         </Link>
//                     </ListItem>
//                 </ListItem>
//             ))}
//         </List>
//     )
// }

