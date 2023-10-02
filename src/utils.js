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
           name: generateUsername(),
           avatar: `https://robohash.org/${index}?set=set2&size=180x180`
       }
    })
}

export {
    proposalArrayToObj,
    prepareMembers,
}
