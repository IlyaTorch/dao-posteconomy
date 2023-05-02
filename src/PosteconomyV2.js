import Web3 from 'web3'
import {getGlobalState, setGlobalState} from './store'
import ManagerDAOs from './abis/ManagerDAOs.json'
import DAO from './abis/DAO.json'
import {proposalArrayToObj} from "./utils";


const {ethereum} = window

const connectWallet = async () => {
    try {
        if (!ethereum) return alert('Please install Metamask')
        const accounts = await ethereum.request({method: 'eth_requestAccounts'})
        setGlobalState('connectedAccount', accounts[0])
    } catch (error) {
        console.log('connectWallet', JSON.stringify(error))
    }
}


const createDAO = async (name) => {
    const contract = getGlobalState('contract')
    const account = getGlobalState('connectedAccount')

    try {
        await contract.methods.createDAO(name).send({from: account});
        location.reload();
    } catch (error) {
        console.log('createDAO', error);
    }
};

const joinDAO = async (daoAddr, account) => {
    const contract = getGlobalState('contract')

    try {
        await contract.methods.joinDAO(daoAddr).send({from: account});
        location.reload();
    } catch (error) {
        console.log('joinDAO', error)
    }
};

const isMember = async (daoAddr, member) => {
    const contract = getGlobalState('contract')

    try {
        return await contract.methods.isMember(daoAddr, member).call();
    } catch (error) {
        console.log('isMember', error)
    }
};

const getDAO = async (daoAddr) => {
    const contract = getGlobalState('contract')

    try {
        return await contract.methods.getDAO(daoAddr).call();
    } catch (error) {
        console.log('getDAO', error)
    }
};

const getAllDAOs = async () => {
    const contract = getGlobalState('contract')

    try {
        return await contract.methods.getAllDAOs().call();
    } catch (error) {
        console.log('getAllDAOs', error)
    }
};


const createDAOproposal = async (contractAddr, title, description, beneficiaryAddr) => {
    try {
        const account = getGlobalState('connectedAccount');
        const contractDAO = new web3.eth.Contract(
            DAO.abi,
            contractAddr
        )

        await contractDAO.methods
            .createProposal(account, title, description)
            .send({from: account})
        location.reload();
    } catch (error) {
        console.log(error.message)
        return error
    }
}


const getDAOproposals = async (daoAddr) => {
    try {
        const contractDAO = new web3.eth.Contract(
            DAO.abi,
            daoAddr
        )

        const proposals = await contractDAO.methods.getProposals().call();
        const daoProposals = [];

        for (let i = 0; i < proposals.length; i++) {
            daoProposals.push(proposalArrayToObj(proposals[i]))
        }
        setGlobalState('proposals', daoProposals);
        return daoProposals;
    } catch (error) {
        console.log('getDAOproposals', error)
    }
};


const getProposal = async (id) => {
    try {
        const proposals = getGlobalState('proposals')
        return proposals.find((proposal) => proposal.id === id)
    } catch (error) {
        console.log('getProposal', error)
    }
}


const voteOnProposal = async (daoAddr, proposalId, choice) => {
    try {
        const contractDAO = new web3.eth.Contract(
            DAO.abi,
            daoAddr
        )
        const account = getGlobalState('connectedAccount')
        return await contractDAO.methods
            .vote(proposalId, choice)
            .send({from: account})
    } catch (error) {
        console.log('voteOnProposal', error)
        return error
    }
}

const listVoters = async (daoAddr, proposalId) => {
    try {
        const contractDAO = new web3.eth.Contract(
            DAO.abi,
            daoAddr
        )
        return await contractDAO.methods.getVotesOf(proposalId).call();
    } catch (error) {
        console.log('listVoters', error)
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
        const networkData = ManagerDAOs.networks[networkId]

        if (networkData) {
            const contract = new web3.eth.Contract(
                ManagerDAOs.abi,
                networkData.address
            )

            setGlobalState('contract', contract)

            const daos = await contract.methods.getAllDAOs().call()
            setGlobalState('daos', daos)
        } else {
            window.alert('ManagerDAOs contract not deployed to detected network.')
        }
        return true
    } catch (error) {
        alert('Please connect your metamask wallet V2!')
        console.log(error)
        return false
    }
}


export {
    loadWeb3,
    connectWallet,
    createDAO,
    getDAO,
    getAllDAOs,
    joinDAO,
    isMember,
    createDAOproposal,
    getDAOproposals,
    getProposal,
    voteOnProposal,
    listVoters
}
