import {getDAO} from "../PosteconomyV2";
import {useState} from "react";
import DAOitem from "../components/DAOitem";
import "../styles/DAOdetails.css";

const DAOdetails = ({daoId}) => {
    const [name, setName] = useState('')
    const [members, setMembers] = useState([])
    getDAO(daoId).then(res => {
        setName(res[1]);
        setMembers(res[0]);
    });

    return (
        <div className="dao-page">
            <div className="dao-page-short-info">
                <DAOitem id={daoId} name={name}/>
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
