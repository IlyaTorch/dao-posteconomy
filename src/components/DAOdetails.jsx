import {createDAOproposal, getDAO, getDAOproposals} from "../PosteconomyV2";
import {useEffect, useState} from "react";
import DAOitem from "../components/DAOitem";
import "../styles/DAOdetails.css";
import {proposalArrayToObj} from "../utils";
import DAOProposals from "./DAOproposals";


const DAOdetails = ({daoId, daoAddr}) => {
    const [name, setName] = useState('')
    const [members, setMembers] = useState([])
    const [proposals, setProposals] = useState([])

    useEffect(() => {
        getDAO(daoAddr).then(res => {
            setName(res[0]);
            setMembers(res[2]);
        });
        getDAOproposals(daoAddr).then(res => {
            setProposals(res)
        })

    }, [daoAddr]);

    const onCreateProposal = () => {
        const title = "test-title";
        const description = "test-description";
        createDAOproposal(daoAddr, title, description).then(res => console.log(res))
    }

    return (
        <div className="dao-page">
            <div className="dao-page-short-info">
                <DAOitem id={daoId} addr={daoAddr} name={name}/>
                <span className="dao-page-members-header">Our Members:</span>
                <ul>
                    {members.map((member, i) => <li key={i} className="li-member">{member}</li>)}
                </ul>
            </div>
            <div className="dao-page-main">
                <span className="dao-page-initiatives-header">DAO Initiatives</span>
                <DAOProposals data={proposals}/>
                <br/>
                <br/>
                <button onClick={onCreateProposal}>Create Proposal</button>
            </div>
        </div>
    )
};

export default DAOdetails;
