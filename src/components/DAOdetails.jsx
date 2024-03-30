import {fetchUser, getDAO, getDAOproposals, setProposalState} from "../PosteconomyV2";
import React, {useEffect, useState} from "react";
import DAOitem from "../components/DAOitem";
import "../styles/DAOdetails.css";
import DAOMembers from "./DAOMembers";
import DAOMain from "./DAOMain";
import DAOVotes from "./DAOVotes";
import DAOAgreement from "./DAOAgreement";
import {ProposalStatus} from "../utils";
import {setGlobalState} from "../store";


const DAOdetails = ({daoId, daoAddr}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [members, setMembers] = useState([])
    const [proposals, setProposals] = useState([])
    const [menuItem, setMenuItem] = useState('details')
    const [proposal_status_int, setProposalStatusInt] = useState(0)

    useEffect(() => {
        const loadData = async () => {
            const dao_details = await getDAO(daoAddr)
            const proposals = await getDAOproposals(daoAddr)
            const members = []
            for (let i = 0; i < dao_details.members_list.length; i++) {
                members.push(await fetchUser(dao_details.members_list[i]))
            }
            setName(dao_details.title)
            setDescription(dao_details.description)
            setMembers(members)
            setProposals(proposals)
            setProposalStatusInt(proposals[0].status_int)
            if (proposals[0].status_int === ProposalStatus.Voting && proposals[0].votesAgainst >= 5) {
                await setProposalState(daoAddr, 0, ProposalStatus.Rejected)
            }
            setGlobalState('dao_addr', daoAddr)
        }
        loadData().catch(console.log)
    }, [daoAddr]);


    return (
        <div className="dao-page">
            <div className="dao-page-short-info">
                <DAOitem id={daoId} addr={daoAddr} name={name}/>
                <div className="dao-menu">
                    <div
                        className={"dao-menu-item " + (menuItem === 'details' ? 'item-active' : '')}
                        onClick={() => {
                        setMenuItem( 'details')
                    }}>Details</div>
                    <div
                        className={"dao-menu-item " + (menuItem === 'members' ? 'item-active' : '')}
                        onClick={() => {
                        setMenuItem( 'members')
                    }}>Members</div>
                    <div
                        className={"dao-menu-item " + (menuItem === 'votes' ? 'item-active' : '')}
                        onClick={() => {
                            setMenuItem( 'votes')
                        }}
                    >
                        Votes
                    </div>
                    {
                        proposal_status_int > 1 &&
                        <div
                            className={"dao-menu-item " + (menuItem === 'agreement' ? 'item-active' : '')}
                            onClick={() => {
                                setMenuItem('agreement')
                            }}
                        >
                            Service Contract
                        </div>
                    }
                </div>
            </div>
            <div className="dao-page-main">
              <div className="header">{name}</div>
                {
                    menuItem === 'details' && <div>
                        <DAOMain addr={daoAddr} id={daoId}/>
                    </div>
                }

                {
                    menuItem === 'members' && <DAOMembers members={members}/>
                }
                {
                    menuItem === 'votes' && <div>
                        <DAOVotes addr={daoAddr} id={daoId} read_only={proposal_status_int > ProposalStatus.Voting}/>
                    </div>
                }

                {
                    menuItem === 'agreement' && <div>
                        <DAOAgreement addr={daoAddr} id={daoId}/>
                    </div>
                }
            </div>
        </div>
    )
};

export default DAOdetails;
