import Web3 from 'web3'
import {getGlobalState, setGlobalState} from './store'
import PosteconomyDAO from './abis/PosteconomyDAO.json'

const {ethereum} = window

const connectWallet = async () => {
    try {
        if (!ethereum) return alert('Please install Metamask')
        const accounts = await ethereum.request({method: 'eth_requestAccounts'})
        setGlobalState('connectedAccount', accounts[0])
    } catch (error) {
        console.log(JSON.stringify(error))
    }
}


const createDAO = async (name) => {
    const contract = getGlobalState('contract')
    const account = getGlobalState('connectedAccount')

    try {
        await contract.methods.createDAO(name).send({from: account});
        location.reload();
    } catch (error) {
        console.log(error)
    }
};

const joinDAO = async (daoId, account) => {
    const contract = getGlobalState('contract')

    try {
        await contract.methods.joinDAO(daoId).send({from: account});
        location.reload();
    } catch (error) {
        console.log(error)
    }
};

const isMember = async (daoId, member) => {
    const contract = getGlobalState('contract')
    const account = getGlobalState('connectedAccount')

    try {
        return await contract.methods.isMember(daoId, member).call();
    } catch (error) {
        console.log(error)
    }
};

// Get the number of DAOs created
const getDAOsCount = async () => {
    const contract = getGlobalState('contract')
    const account = getGlobalState('connectedAccount')
    try {
        return await contract.methods.getDAOsCount().call();
    } catch (error) {
        console.log(error)
    }
};

// Get the members and name of a DAO
const getDAO = async (daoId) => {
    const contract = getGlobalState('contract')

    try {
        return await contract.methods.getDAO(daoId).call();
    } catch (error) {
        console.log(error)
    }
};

// Get an array of all DAO names
const getAllDAOs = async () => {
    const contract = getGlobalState('contract')
    const account = getGlobalState('connectedAccount')

    try {
        return await contract.methods.getAllDAOs().call();
    } catch (error) {
        console.log(error)
    }
};


const raiseProposal = async ({title, description, beneficiary, amount, initiator}) => {
    try {
        amount = window.web3.utils.toWei(amount.toString(), 'ether')
        const contract = getGlobalState('contract')
        const account = getGlobalState('connectedAccount')

        let proposal = await contract.methods
            .createProposal(title, description, beneficiary, amount)
            .send({from: account})

        console.log(proposal)

        return proposal
    } catch (error) {
        console.log(error.message)
        return error
    }
}

const performContribute = async (amount) => {
    try {
        amount = window.web3.utils.toWei(amount.toString(), 'ether')
        const contract = getGlobalState('contract')
        const account = getGlobalState('connectedAccount')

        let balance = await contract.methods
            .contribute()
            .send({from: account, value: amount})
        balance = window.web3.utils.fromWei(
            balance.events.Action.returnValues.amount
        )
        return balance
    } catch (error) {
        console.log(error.message)
        return error
    }
}

const retrieveProposal = async (id) => {
    const web3 = window.web3
    try {
        const contract = getGlobalState('contract')
        const proposal = await contract.methods.getProposal(id).call().wait()
        return {
            id: proposal.id,
            amount: web3.utils.fromWei(proposal.amount),
            title: proposal.title,
            description: proposal.description,
            paid: proposal.paid,
            passed: proposal.passed,
            proposer: proposal.proposer,
            upvotes: Number(proposal.upvotes),
            downvotes: Number(proposal.downvotes),
            beneficiary: proposal.beneficiary,
            executor: proposal.executor,
            duration: proposal.duration,
        }
    } catch (error) {
        console.log(error)
    }
}

const reconstructProposal = (proposal) => {
    return {
        id: proposal.id,
        amount: window.web3.utils.fromWei(proposal.amount),
        title: proposal.title,
        description: proposal.description,
        paid: proposal.paid,
        passed: proposal.passed,
        proposer: proposal.proposer,
        upvotes: Number(proposal.upvotes),
        downvotes: Number(proposal.downvotes),
        beneficiary: proposal.beneficiary,
        executor: proposal.executor,
        duration: proposal.duration,
    }
}

const getProposal = async (id) => {
    try {
        const proposals = getGlobalState('proposals')
        return proposals.find((proposal) => proposal.id == id)
    } catch (error) {
        console.log(error)
    }
}

const voteOnProposal = async (proposalId, supported) => {
    try {
        const contract = getGlobalState('contract')
        const account = getGlobalState('connectedAccount')
        const vote = await contract.methods
            .performVote(proposalId, supported)
            .send({from: account})
        return vote
    } catch (error) {
        console.log(error)
        return error
    }
}

const listVoters = async (id) => {
    try {
        const contract = getGlobalState('contract')
        const votes = await contract.methods.getVotesOf(id).call()
        return votes
    } catch (error) {
        console.log(error)
    }
}

const payoutBeneficiary = async (id) => {
    try {
        const contract = getGlobalState('contract')
        const account = getGlobalState('connectedAccount')
        const balance = await contract.methods
            .payBeneficiary(id)
            .send({from: account})
        return balance
    } catch (error) {
        return error
    }
}

const loadWeb3 = async () => {
    try {
        if (!ethereum) return alert('Please install Metamask')

        window.web3 = new Web3(ethereum)
        await ethereum.request({method: 'eth_requestAccounts'})
        window.web3 = new Web3(window.web3.currentProvider)

        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        setGlobalState('connectedAccount', accounts[0])

        const networkId = await web3.eth.net.getId()
        const networkData = PosteconomyDAO.networks[networkId]

        if (networkData) {
            const contract = new web3.eth.Contract(
                PosteconomyDAO.abi,
                networkData.address
            )
            // const isStakeholder = await contract.methods
            //   .isStakeholder()
            //   .call({ from: accounts[0] })
            // const proposals = await contract.methods.getProposals().call()
            // const balance = await contract.methods.daoBalance().call()
            // const mybalance = await contract.methods
            //   .getBalance()
            //   .call({ from: accounts[0] })

            setGlobalState('contract', contract)

            const daos = await contract.methods.getAllDAOs().call()
            setGlobalState('daos', daos)
            // setGlobalState('balance', web3.utils.fromWei(balance))
            // setGlobalState('mybalance', web3.utils.fromWei(mybalance))
            // setGlobalState('isStakeholder', isStakeholder)
            // setGlobalState('proposals', structuredProposals(proposals))
        } else {
            window.alert('PosteconomyDAO contract not deployed to detected network.')
        }
        return true
    } catch (error) {
        alert('Please connect your metamask wallet V2!')
        console.log(error)
        return false
    }
}

const structuredProposals = (proposals) => {
    const web3 = window.web3
    return proposals
        .map((proposal) => ({
            id: proposal.id,
            amount: web3.utils.fromWei(proposal.amount),
            title: proposal.title,
            description: proposal.description,
            paid: proposal.paid,
            passed: proposal.passed,
            proposer: proposal.proposer,
            upvotes: Number(proposal.upvotes),
            downvotes: Number(proposal.downvotes),
            beneficiary: proposal.beneficiary,
            executor: proposal.executor,
            duration: proposal.duration,
        }))
        .reverse()
}

export {
    loadWeb3,
    connectWallet,
    createDAO,
    getDAO,
    getDAOsCount,
    getAllDAOs,
    joinDAO,
    isMember,
}
