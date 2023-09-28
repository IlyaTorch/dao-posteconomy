import {createDAOproposal, getDAO, getDAOproposals} from "../PosteconomyV2";
import {useEffect, useState} from "react";
import DAOitem from "../components/DAOitem";
import "../styles/DAOdetails.css";
import DAOProposals from "./DAOproposals";
import CreateProposal from "./CreateProposal";
import {getGlobalState, setGlobalState} from "../store";
import DAOMenu from "./DAOMenu";
import DAOMembers from "./DAOMembers";


const DAOdetails = ({daoId, daoAddr}) => {
    const [name, setName] = useState('')
    const [members, setMembers] = useState([])
    const [proposals, setProposals] = useState([])
    const menuItem = getGlobalState('daoDetailsMenuItem')
    console.log('menuItem', menuItem)

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
        setGlobalState('createProposalModal', '')
        // const title = "test-title";
        // const description = "test-description";
        createDAOproposal(daoAddr, title, description).then(res => console.log(res))
    }

    return (
        <div className="dao-page">
            <div className="dao-page-short-info">
                <DAOitem id={daoId} addr={daoAddr} name={name}/>
                <DAOMenu/>
                <span className="dao-page-members-header">Our Members:</span>
                <ul>
                    {members.map((member, i) => <li key={i} className="li-member">{member}</li>)}
                </ul>
            </div>
            <div className="dao-page-main">
                {
                    menuItem === 'members' && <DAOMembers members={
                        [
                            {email: 'test@me.com', name: 'Ilya Torch', avatar: 'https://robohash.org/0?set=set2&size=180x180'},
                            {email: 'test@me.com', name: 'Ilya Torch', avatar: 'https://robohash.org/0?set=set2&size=180x180'},
                            {email: 'test@me.com', name: 'Ilya Torch', avatar: 'https://robohash.org/0?set=set2&size=180x180'},
                            {email: 'test@me.com', name: 'Ilya Torch', avatar: 'https://robohash.org/0?set=set2&size=180x180'},
                            {email: 'test@me.com', name: 'Ilya Torch', avatar: 'https://robohash.org/0?set=set2&size=180x180'},
                            {email: 'test@me.com', name: 'Ilya Torch', avatar: 'https://robohash.org/0?set=set2&size=180x180'},
                            {email: 'test@me.com', name: 'Ilya Torch', avatar: 'https://robohash.org/0?set=set2&size=180x180'},
                            {email: 'test@me.com', name: 'Ilya Torch', avatar: 'https://robohash.org/0?set=set2&size=180x180'},
                            {email: 'test@me.com', name: 'Ilya Torch', avatar: 'https://robohash.org/0?set=set2&size=180x180'},
                            {email: 'test@me.com', name: 'Ilya Torch', avatar: 'https://robohash.org/0?set=set2&size=180x180'},
                            {email: 'test@me.com', name: 'Ilya Torch', avatar: 'https://robohash.org/0?set=set2&size=180x180'},
                        ]
                    }/>
                }
                {
                    menuItem === 'initiatives' && <div>
                        <span className="dao-page-initiatives-header">DAO Initiatives</span>
                        <DAOProposals data={proposals}/>
                        <br/>
                        <br/>
                        <CreateProposal daoAddr={daoAddr}/>
                        <button onClick={onCreateProposal}>Create Proposal</button>
                    </div>
                }
            </div>
        </div>
    )
};

export default DAOdetails;
