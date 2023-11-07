import Web3 from 'web3'
import {getGlobalState, setGlobalState} from './store'
import ManagerDAOs from './abis/ManagerDAOs.json'
import DAO from './abis/DAO.json'
import {proposalArrayToObj, proposalDetailToObj} from "./utils";


const {ethereum} = window
const BACKEND_URL = "http://0.0.0.0:8000"
const DEFAULT_ROLE = "student"
const DEFAULT_USERNAME = "Ilya Torch"
const DEFAULT_AVATAR_URL = "https://avatars.githubusercontent.com/u/45897493?v=4"

const connectWallet = async () => {
    try {
        if (!ethereum) return alert('Please install Metamask')
        const accounts = await ethereum.request({method: 'eth_requestAccounts'})
        setGlobalState('connectedAccount', accounts[0])
    } catch (error) {
        console.log('connectWallet', JSON.stringify(error))
    }
}


const createDAO = async (name, description) => {
    const contract = getGlobalState('contract')
    const account = getGlobalState('connectedAccount')

    try {
        await contract.methods.createDAO(name, description).send({from: account});
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
        const resp = await contract.methods.getDAO(daoAddr).call();
        return {
            dao_addr: resp[0],
            title: resp[1],
            description: resp[2],
            scope: resp[3],
            members_count: resp[4],
            members_list: resp[5]
        }
    } catch (error) {
        console.log('getDAO', error)
    }
};

const getAllDAOs = async () => {
    const contract = getGlobalState('contract')

    try {
        const data = await contract.methods.getAllDAOs().call();
        console.log(data)
        return data
    } catch (error) {
        console.log('getAllDAOs', error)
    }
};


const createDAOproposal = async (contractAddr, title, description, beneficiaryAddr, start, end) => {
    try {
        const account = getGlobalState('connectedAccount');
        const contractDAO = new web3.eth.Contract(
            DAO.abi,
            contractAddr
        )

        await contractDAO.methods
            .createProposal(account, title, description, beneficiaryAddr, start, end, false)
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
            daoProposals.push(await proposalArrayToObj(proposals[i]))
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


const voteOnProposal = async (daoAddr, proposalId, amount, username, user_avatar) => {
    try {
        const contractDAO = new web3.eth.Contract(
            DAO.abi,
            daoAddr
        )
        const account = getGlobalState('connectedAccount')
        return await contractDAO.methods
            .vote(proposalId, amount > 0, username, user_avatar)
            .send({from: account, value: amount})
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

const getProposalDetails = async (daoAddr, proposalId) => {
    try {
        const contractDAO = new web3.eth.Contract(
            DAO.abi,
            daoAddr
        )
        const details = await contractDAO.methods.getProposalDetails(proposalId).call();
        return proposalDetailToObj(details)
    } catch (error) {
        console.log('getProposalDetails', error)
    }
};


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

            await createInitialData(contract)

            const dao_addresses = await contract.methods.getAllDAOs().call()
            setGlobalState('dao_addresses', dao_addresses)
            const daos = []
            for (let i = 0; i < dao_addresses.length; i++) {
                const dao_details = await getDAO(dao_addresses[i])
                const dao_additional_details = await fetchDAO(dao_addresses[i])
                daos.push({...dao_details, ...dao_additional_details})
            }
            setGlobalState('daos', daos)
            setGlobalState('filtered_daos', daos)
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


const createInitialData = async (contract) => {
    const account = getGlobalState('connectedAccount')
    // await contract.methods.addDefaultDAOs().send({from: account});
    const daos = await getAllDAOs()
    for (let i = 0; i < daos.length; i++) {
        const dao = await getDAO(daos[i])
        await fetchCreateDao(dao)
    }
    await fetchCreateUser({
        address: account,
        role: DEFAULT_ROLE,
        username: DEFAULT_USERNAME,
        avatar_url: DEFAULT_AVATAR_URL,
    })
}

const fetchCreateUser = async (user) => {
    const resp = await fetch(`${BACKEND_URL}/create/user`, {
        method: "POST",
        body: JSON.stringify(user)
    })
    return await resp.json()
}


const fetchCreateDao = async (dao) => {
    const resp = await fetch(`${BACKEND_URL}/create/dao`, {
        method: "POST",
        body: JSON.stringify(dao)
    })
    return await resp.json()
}


const fetchUser = async (addr) => {
    const resp = await fetch(`${BACKEND_URL}/users/${addr}`)
    return await resp.json()
}


const fetchDAO = async (addr) => {
    const resp = await fetch(`${BACKEND_URL}/daos/${addr}`)
    return await resp.json()
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
    listVoters,
    createInitialData,
    getProposalDetails,
    fetchUser,
    fetchDAO,
}
