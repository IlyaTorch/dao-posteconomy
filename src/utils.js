const proposalArrayToObj = (prop) => {
    return {
            initiator: prop[0],
            title: prop[1],
            description: prop[2],
            votesFor: parseInt(prop[3]),
            votesAgainst: parseInt(prop[4]),
            executed: prop[5],
        }
};


export {
    proposalArrayToObj,
}
