import {generateUsername} from "unique-username-generator";

const proposalArrayToObj = (prop) => {
    return {
            id: parseInt(prop[0]),
            initiator: prop[1],
            title: prop[2],
            description: prop[3],
            votesFor: parseInt(prop[4]),
            votesAgainst: parseInt(prop[5]),
            executed: prop[6],
            amount: parseInt(prop.amount),
            creator_avatar: `https://robohash.org/${prop[0]}?set=set2&size=180x180`,
            creator: prop[1],
            status: prop[6] ? 'executed' : 'active',
            voted: parseInt(prop[4]) + parseInt(prop[5])
        }
};


const prepareMembers = (members_list) => {
    return members_list.map((member, index) => {
       return {
           address: `${member.substring(0,15)}...`,
           name: generateUsername('',1, 10),
           avatar: `https://robohash.org/${index}?set=set2&size=180x180`
       }
    })
}

const proposalDetailToObj = (prop) => {
    return {
        title: prop[0],
        description: prop[1],
        votes_count: parseInt(prop[2]) + parseInt(prop[3]),
        status: prop[4] ? "Executed" : "Active",
        amount: prop[5],
        author_name: prop[6].slice(0, 15),
        author_avatar: prop[7],
        start: prop[8],
        end: prop[9],
        votes: prop[10].map(vote => {
            return {
                ...vote,
                vote: vote.sum > 0 ? "Voted Up" : "Voted Down",
                sum: `${vote.sum} ETH`
            }
        })
    }
};



export {
    proposalArrayToObj,
    prepareMembers,
    proposalDetailToObj,
}
