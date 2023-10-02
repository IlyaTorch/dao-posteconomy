import {createDAOproposal, getDAO, getDAOproposals} from "../PosteconomyV2";
import {useEffect, useState} from "react";
import DAOitem from "../components/DAOitem";
import "../styles/DAOdetails.css";
import DAOProposals from "./DAOproposals";
import CreateProposal from "./CreateProposal";
import {getGlobalState, setGlobalState} from "../store";
import DAOMenu from "./DAOMenu";
import DAOMembers from "./DAOMembers";
import DAOAbout from "./DAOAbout";
import DAOInitiatives from "./DAOInitiatives";
import {prepareMembers} from "../utils";


const DAOdetails = ({daoId, daoAddr}) => {
    const [name, setName] = useState('')
    const [members, setMembers] = useState([])
    const [proposals, setProposals] = useState([])
    const menuItem = getGlobalState('daoDetailsMenuItem')

    useEffect(() => {
        getDAO(daoAddr).then(res => {
            setName(res[0]);
            setMembers(prepareMembers(res[3]));
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
            </div>
            <div className="dao-page-main">
                {
                    menuItem === 'members' && <DAOMembers members={members}/>
                }
                {
                    menuItem === 'initiatives' && <div>
                        {/*<span className="dao-page-initiatives-header">DAO Initiatives</span>*/}
                        <DAOProposals data={proposals}/>
                        <DAOInitiatives initiatives={[...proposals
                            // {title: 'Organize Book Club', creator_avatar: 'https://robohash.org/0?set=set2&size=180x180', creator: '0xABF5459D9531622D7482A66bE04F740d8B6fA48c', status: 'active', description: 'We are forced to start from the fact that the boundary of personnel training requires the analysis of thoughtful reasoning. Taking into account key behavioral scenarios, the innovative path we have chosen...', voted: 50},
                            // {title: 'Organize Book Club', creator_avatar: 'https://robohash.org/0?set=set2&size=180x180', creator: '0xABF5459D9531622D7482A66bE04F740d8B6fA48c', status: 'active', description: 'We are forced to start from the fact that the boundary of personnel training requires the analysis of thoughtful reasoning. Taking into account key behavioral scenarios, the innovative path we have chosen...', voted: 50},
                            // {title: 'Organize Book Club', creator_avatar: 'https://robohash.org/0?set=set2&size=180x180', creator: '0xABF5459D9531622D7482A66bE04F740d8B6fA48c', status: 'active', description: 'We are forced to start from the fact that the boundary of personnel training requires the analysis of thoughtful reasoning. Taking into account key behavioral scenarios, the innovative path we have chosen...', voted: 50},
                            // {title: 'Organize Book Club', creator_avatar: 'https://robohash.org/0?set=set2&size=180x180', creator: '0xABF5459D9531622D7482A66bE04F740d8B6fA48c', status: 'active', description: 'We are forced to start from the fact that the boundary of personnel training requires the analysis of thoughtful reasoning. Taking into account key behavioral scenarios, the innovative path we have chosen...', voted: 50},
                            // {title: 'Organize Book Club', creator_avatar: 'https://robohash.org/0?set=set2&size=180x180', creator: '0xABF5459D9531622D7482A66bE04F740d8B6fA48c', status: 'active', description: 'We are forced to start from the fact that the boundary of personnel training requires the analysis of thoughtful reasoning. Taking into account key behavioral scenarios, the innovative path we have chosen...', voted: 50},
                            // {title: 'Organize Book Club', creator_avatar: 'https://robohash.org/0?set=set2&size=180x180', creator: '0xABF5459D9531622D7482A66bE04F740d8B6fA48c', status: 'active', description: 'We are forced to start from the fact that the boundary of personnel training requires the analysis of thoughtful reasoning. Taking into account key behavioral scenarios, the innovative path we have chosen...', voted: 50},
                        ]}/>
                        <CreateProposal daoAddr={daoAddr}/>
                        <button onClick={onCreateProposal}>Create Proposal</button>
                    </div>
                }
                {
                    menuItem === 'about' && <div>
                        <DAOAbout
                            description="Each of us understands the obvious: the beginning of the daily work of forming a position largely determines the importance of the corresponding activation conditions. It should be noted that a high-quality prototype of a future project helps improve the quality of the priority requirements. Only direct participants in technical progress are functionally separated into independent elements."
                            administrators={members.slice(0, 2)}
                        />
                    </div>
                }
            </div>
        </div>
    )
};

export default DAOdetails;
