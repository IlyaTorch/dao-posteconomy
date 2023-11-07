import {generateUsername} from "unique-username-generator";
import Web3 from "web3";
import {fetchUser} from "./PosteconomyV2";

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
            status: prop[6] ? 'executed' : 'active',
            voted: parseInt(prop[4]) + parseInt(prop[5])
        }
};


const proposalDetailToObj = (prop) => {
    return {
        title: prop[0],
        description: prop[1],
        votes_count: parseInt(prop[2]) + parseInt(prop[3]),
        status: prop[4] ? "Executed" : "Active",
        amount: prop[5],
        author_addr: prop[6],
        start: prop[7],
        end: prop[8],
        votes: prop[9].map(vote => {
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
}
