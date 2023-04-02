import {getDAO} from "../PosteconomyV2";
import {useEffect, useState} from "react";
import DAOitem from "../components/DAOitem";
import "../styles/DAOdetails.css";

const DAOdetails = ({daoId, daoAddr}) => {
    const [name, setName] = useState('')
    const [members, setMembers] = useState([])

    useEffect(() => {
        getDAO(daoAddr).then(res => {
            setName(res[0]);
            setMembers(res[2]);
        });
    }, [daoAddr]);

    return (
        <div className="dao-page">
            <div className="dao-page-short-info">
                <DAOitem id={daoId} addr={daoAddr} name={name}/>
                <span className="dao-page-members-header">Our Members:</span>
                <ul>
                    {members.map((member, i) => <li key={i} className="li-member">{member}</li>)}
                </ul>
            </div>
            <div className="dao-page-initiatives">
                <span className="dao-page-initiatives-header">DAO Initiatives</span>
                <ul>
                    {members.map((member, i) => <li key={i}>{member}</li>)}
                </ul>
            </div>
        </div>
    )
};

export default DAOdetails;
