import React, {useEffect, useState} from "react";
import {fetchDAO, getDAO, isMember, joinDAO} from "../PosteconomyV2";
import {useGlobalState} from "../store";
import "../styles/DAOitem.css";
import {Link, useLocation} from "react-router-dom";

const DAOitem = ({id, addr}) => {
    const [acc] = useGlobalState('connectedAccount');
    const [daoMember, setDaoMember] = useState(false)
    const [daoTags, setDaoTags] = useState([])
    const [daoName, setDaoName] = useState('')
    const [daoAvatar, setDaoAvatar] = useState('')
    const location = useLocation();
    const is_dao_page = location.pathname.includes('dao')

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

    const onJoinDAO = (event) => {
        joinDAO(addr, acc).then(r => console.log(r))
        console.log(event)
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
            {!is_dao_page && <span className="name">{daoName}</span>}
            <div className="tags">
                {daoTags.map(tag => (
                    <><span key={tag} className="tag">#{tag}&nbsp;</span><br/></>
                    ))}
            </div>
            {daoMember && <button className='button-member'>Member</button>}
            {is_dao_page && !daoMember &&
                <button className='button-join' >
                    <b>Join as</b> <select name="role" className="join-role" onChange={event => onJoinDAO(event)}>
                      <option value="">--Choose role--</option>
                      <option value="inversotr">Investor</option>
                      <option value="service_provider">Service Provider</option>
                      <option value="client">Client</option>
                    </select>
                </button>
            }
        </div>
    )
};


export default DAOitem;
