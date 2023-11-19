import React, {useEffect, useState} from "react";
import {fetchUser} from "../PosteconomyV2";
import "../styles/UserItem.css";
import {Link} from "react-router-dom";

const UserItem = ({addr}) => {
    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState('')
    const [role, setRole] = useState('')

    useEffect(() => {
        const loadData = async () => {
            const user = await fetchUser(addr)
            setUsername(user.username)
            setAvatar(user.avatar_url)
            setRole(user.role)
        }
        loadData().catch(console.log)
    }, [addr]);

    return (
        <div className="user-item" id={addr}>
            <Link to={`/users/${addr}`}>
                <img
                    src={avatar}
                    alt={addr}
                />
            </Link>
            <br/>
            <span className="name">{username}</span>
            <div>{role}</div>
            <div>{addr.slice(1, 20)}...</div>
        </div>
    )
};


export default UserItem;
