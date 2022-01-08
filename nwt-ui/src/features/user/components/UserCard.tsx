import React from "react";
import {User} from "common/types/commonTypes";

export interface UserCardProps {
    user: User
}

const UserCard = ({user}: UserCardProps) => {
    return (
        <div>One User: {user.name}!</div>
    )
}

export default UserCard