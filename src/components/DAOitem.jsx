import React, {useEffect, useState} from "react";
import {fetchDAO, getDAO, isMember, joinDAO} from "../PosteconomyV2";
import {useGlobalState} from "../store";
import "../styles/DAOitem.css";
import {Link} from "react-router-dom";

const DAOitem = ({id, addr}) => {
    const [acc] = useGlobalState('connectedAccount');
    const [daoMember, setDaoMember] = useState(false)
    const [daoTags, setDaoTags] = useState([])
    const [daoName, setDaoName] = useState('')
    const [daoAvatar, setDaoAvatar] = useState('')

    useEffect(() => {
        const loadData = async () => {
            const is_member = await isMember(addr, acc)
            const dao_details = await getDAO(addr)
            const dao_additional_details = await fetchDAO(addr)

            setDaoMember(is_member)
            setDaoName(dao_details.title)
            setDaoTags(dao_additional_details.tags)
            setDaoAvatar(dao_additional_details.dao_avatar)
        }
        loadData().catch(console.log)
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
                    src={daoAvatar}
                    alt={addr}
                />
            </Link>
            <br/>
            <span className="name">
                {daoName}
            </span>
            <div className="tags">
                {daoTags.map(tag => (
                    <><span className="tag">#{tag}&nbsp;</span><br/></>
                    ))}
            </div>
            {daoMember ?
                <button className='button-member'>Member</button> :
                <button className='button-join' onClick={onJoinDAO}>Join</button>}
        </div>
    )
};


export default DAOitem;
