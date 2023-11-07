import { fetchDAO, fetchUser, getDAO, getDAOproposals } from "../PosteconomyV2";
import {useEffect, useState} from "react";
import DAOitem from "../components/DAOitem";
import "../styles/DAOdetails.css";
import CreateProposal from "./CreateProposal";
import {getGlobalState, setGlobalState} from "../store";
import DAOMenu from "./DAOMenu";
import DAOMembers from "./DAOMembers";
import DAOAbout from "./DAOAbout";
import DAOInitiatives from "./DAOInitiatives";


const DAOdetails = ({daoId, daoAddr}) => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [members, setMembers] = useState([])
    const [proposals, setProposals] = useState([])
    const menuItem = getGlobalState('daoDetailsMenuItem')
    let d = new Date();
    const start = d.toString();
    d.setDate(d.getDate() + 2);
    const end = d.toString()

    useEffect(() => {
        const loadData = async () => {
            const dao_details = await getDAO(daoAddr)
            console.log(dao_details)
            const proposals = await getDAOproposals(daoAddr)
            console.log(proposals)
            const members = []
            for (let i = 0; i < dao_details.members_list.length; i++) {
                members.push(await fetchUser(dao_details.members_list[i]))
            }
            setName(dao_details.title)
            setDescription(dao_details.description)
            setMembers(members)
            setProposals(proposals)
        }
        loadData().catch(console.log)
    }, [daoAddr]);


    const onCreateProposal = () => {
        setGlobalState('createProposalModal', '')
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
                        <DAOInitiatives proposals={proposals}/>
                        <CreateProposal
                            daoAddr={daoAddr}
                            user_avatar='https://robohash.org/25?set=set2&size=180x180'
                            start={start}
                            end={end}
                        />
                        <button onClick={onCreateProposal}>Create Proposal</button>
                    </div>
                }
                {
                    menuItem === 'about' && <div>
                        <DAOAbout
                            description={description}
                            administrators={members.slice(0, 1)}
                        />
                    </div>
                }
            </div>
        </div>
    )
};

export default DAOdetails;
