import React, {useState} from "react";
import {isMember, joinDAO} from "../PosteconomyV2";
import {useGlobalState} from "../store";
import "../styles/DAOitem.css";

const DAOitem = ({id, name}) => {
    const [acc] = useGlobalState('connectedAccount');
    const [daoMember, setDaoMember] = useState(false)
    isMember(id, acc).then(res => setDaoMember(res));

    const onJoinDAO = () => {
        joinDAO(id, acc).then(r => console.log(r))
    }

    const redirectToDAOpage = () => {
        window.location.replace(`/dao/${id}`);
    }

    return (
        <div className="dao-item" id={id}>
            <img
                src={`https://robohash.org/${id}?set=set2&size=180x180`}
                alt={name}
                onClick={redirectToDAOpage}
            />
            <br/>
            <span className="name">
            {name}
        </span>
            <br/>
            {daoMember ?
                <button className='button-member'>Member</button> :
                <button className='button-join' onClick={onJoinDAO}>Join</button>}
        </div>
    )
};


export default DAOitem;
