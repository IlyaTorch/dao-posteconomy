import React, {useEffect, useState} from "react";
import {getDAO, isMember, joinDAO} from "../PosteconomyV2";
import {useGlobalState} from "../store";
import "../styles/DAOitem.css";
import {Link} from "react-router-dom";

const DAOitem = ({id, addr}) => {
    const [acc] = useGlobalState('connectedAccount');
    const [daoMember, setDaoMember] = useState(false)
    const [daoName, setDaoName] = useState('')

    useEffect(() => {
        isMember(addr, acc).then(res => setDaoMember(res));
        getDAO(addr).then(res => setDaoName(res[0]));
    }, [addr]);

    const onJoinDAO = () => {
        joinDAO(addr, acc).then(r => console.log(r))
    }

    return (
        <div className="dao-item" id={addr}>
            <Link
                to={`/dao/${addr}`}
            >
                <img
                    src={`https://robohash.org/${id}?set=set2&size=180x180`}
                    alt={addr}
                />
            </Link>
            <br/>
            <span className="name">
                {daoName}
            </span>
            <br/>
            {daoMember ?
                <button className='button-member'>Member</button> :
                <button className='button-join' onClick={onJoinDAO}>Join</button>}
        </div>
    )
};


export default DAOitem;
