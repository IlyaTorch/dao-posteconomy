import Web3 from 'web3'
import {getGlobalState, setGlobalState} from './store'
import ManagerDAOs from './abis/ManagerDAOs.json'
import ManagerDefaultUsers from './abis/ManagerDefaultUsers.json'
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


const createDAO = async (name, description, scope) => {
    const contract = getGlobalState('contract')
    const account = getGlobalState('connectedAccount')
    const current_date = new Date();
    const end_date = new Date();
    end_date.setDate(current_date.getDate() + 7);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

    try {
        return await contract.methods.createDAO(
            name,
            description,
            scope,
            current_date.toLocaleDateString('en-US', options),
            end_date.toLocaleDateString('en-US', options)
        ).send({from: account});
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
        return await contract.methods.getAllDAOs().call();
    } catch (error) {
        console.log('getAllDAOs', error)
    }
};


const createProposal = async (contractAddr, title, description, beneficiaryAddr, start, end) => {
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


const setProposalState = async (dao_addr, proposal_id, state) => {
    try {
        const account = getGlobalState('connectedAccount');
        const contractDAO = new web3.eth.Contract(
            DAO.abi,
            dao_addr
        )

        await contractDAO.methods
            .setProposalState(proposal_id, state)
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


const voteOnProposal = async (daoAddr, proposalId, amount, username, user_addr) => {
    try {
        const contractDAO = new web3.eth.Contract(
            DAO.abi,
            daoAddr
        )
        const account = getGlobalState('connectedAccount')
        const res = await contractDAO.methods
            .vote(proposalId, amount > 0, username, user_addr)
            .send({from: account, value: amount})
        await fetchCreateVote({
            user_address: account,
            dao_addr: daoAddr,
            proposal_id: 0,
            choice: amount > 0,
            sum: amount,
            timestamp: 0, // TODO js .currnet timestamp
        })
        console.log('vote created')
        return res
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
        const network_data_default_users = ManagerDefaultUsers.networks[networkId]
        if (network_data_default_users) {
            const contract = new web3.eth.Contract(
                ManagerDefaultUsers.abi,
                network_data_default_users.address
            )

            await addDefaultUsers(
                contract,
                getGlobalState('dao_addresses')[0],
                getGlobalState('dao_addresses')[1],
            )
        } else {
            window.alert('ManagerDefaultUsers contract not deployed to detected network.')
        }
        return true
    } catch (error) {
        alert('Please connect your metamask wallet V2!')
        console.log(error)
        return false
    }
}


const addDefaultUsers = async (contract, rejected, work_in_progr) => {
    const account = getGlobalState('connectedAccount')
    await contract.methods.addDefaultUserAndVotes(rejected, work_in_progr).send({from: account})
}


const createInitialData = async (contract) => {
    const account = getGlobalState('connectedAccount')
    await contract.methods.addDefaultDAOs().send({from: account});
    const daos = await getAllDAOs()
    for (let i = 0; i < daos.length; i++) {
        const dao = await getDAO(daos[i])
        await fetchCreateDao(dao)
        const votes = await listVoters(dao.dao_addr, 0)
        for (let j = 0; j < votes.length; j++) {
            await fetchCreateVote({
                user_address: votes[j].user_addr,
                dao_addr: dao.dao_addr,
                proposal_id: 0,
                choice: votes[j].choice,
                sum: votes[j].sum,
                timestamp: votes[j].timestamp, // TODO js .currnet timestamp
            })
        }

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


const fetchUpdateDao = async (dao_addr, data) => {
    const resp = await fetch(`${BACKEND_URL}/daos/${dao_addr}`, {
        method: "PATCH",
        body: JSON.stringify(data)
    })
    return await resp.json()
}



const fetchCreateVote = async (vote) => {
    const resp = await fetch(`${BACKEND_URL}/votes`, {
        method: "POST",
        body: JSON.stringify(vote)
    })
    return await resp.json()
}


const fetchUser = async (addr) => {
    const resp = await fetch(`${BACKEND_URL}/users/${addr}`)
    return await resp.json()
}


const fetchUserVotes = async (addr) => {
    const resp = await fetch(`${BACKEND_URL}/votes/${addr}`)
    return await resp.json()
}



const fetchDAO = async (addr) => {
    const resp = await fetch(`${BACKEND_URL}/daos/${addr}`)
    return await resp.json()
}


const fetchTasks = async (addr) => {
    const resp = await fetch(`${BACKEND_URL}/daos/${addr}/tasks`)
    return await resp.json()
}


const fetchCreateTask = async (addr) => {
    const resp = await fetch(`${BACKEND_URL}/daos/${addr}/tasks`, {
        method: "POST",
        body: JSON.stringify({})
    })
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
    createProposal,
    getDAOproposals,
    getProposal,
    voteOnProposal,
    listVoters,
    createInitialData,
    getProposalDetails,
    fetchUser,
    fetchDAO,
    fetchCreateDao,
    fetchUpdateDao,
    fetchUserVotes,
    setProposalState,
    addDefaultUsers,
    fetchTasks,
    fetchCreateTask,
}
