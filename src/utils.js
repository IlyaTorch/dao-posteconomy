const proposalArrayToObj = (prop) => {
    return {
            id: parseInt(prop[0]),
            initiator: prop[1],
            title: prop[2],
            description: prop[3],
            votesFor: parseInt(prop[4]),
            votesAgainst: parseInt(prop[5]),
            executed: prop[6],
        }
};


export {
    proposalArrayToObj,
}
