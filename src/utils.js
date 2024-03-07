import Web3 from "web3";
import {fetchUser} from "./PosteconomyV2";


const ProposalStatus = {
    Voting: 0,
    Rejected:1,
    Work_On_Contract: 2,
    performers_selection: 3,
    WIP: 4,
    finished: 5
}

function getStatusName(status) {
  const statusKeys = Object.keys(ProposalStatus);
  const statusValues = Object.values(ProposalStatus);
  const index = statusValues.indexOf(status);
  return index !== -1 ? statusKeys[index] : null;
}


const proposalArrayToObj = async (prop) => {
    const u = await fetchUser(prop[1])
    return {
            id: parseInt(prop[0]),
            initiator: prop[1],
            title: prop[2],
            description: prop[3],
            votesFor: parseInt(prop[4]),
            votesAgainst: parseInt(prop[5]),
            executed: prop[6],
            amount: parseInt(prop.amount),
            creator_avatar: u.avatar_url,
            creator_username: u.username,
            creator_addr: prop[1],
            status: getStatusName(parseInt(prop[11])),
            status_int: parseInt(prop[11]),
            voted: parseInt(prop[4]) + parseInt(prop[5])
        }
};


const proposalDetailToObj = (prop) => {
    return {
        title: prop[0],
        description: prop[1],
        votes_count: parseInt(prop[2]) + parseInt(prop[3]),
        amount: prop[5],
        author_addr: prop[6],
        start: prop[7],
        end: prop[8],
        status: getStatusName(parseInt(prop[9])),
        status_int: parseInt(prop[9]),
        votes: prop[10].map(vote => {
            return {
                ...vote,
                vote: vote.sum > 0 ? "Voted Up" : "Voted Down",
                sum: `${Web3.utils.fromWei(vote.sum, 'ether')} ETH`
            }
        })
    }
};



export {
    proposalArrayToObj,
    proposalDetailToObj,
    ProposalStatus,
}
