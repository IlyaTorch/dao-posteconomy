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
            .createProposal(account, title, description, beneficiaryAddr)
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


const voteOnProposal = async (daoAddr, proposalId, amount) => {
    try {
        const contractDAO = new web3.eth.Contract(
            DAO.abi,
            daoAddr
        )
        const account = getGlobalState('connectedAccount')
        return await contractDAO.methods
            .vote(proposalId, amount > 0)
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


const createInitialData = async (contract) => {
    const DAO_NAMES = [
        {name: 'developers', description: 'Developer DAO is a community of thousands of web3 builders creating a better internet. Join us and create the future.'},
        {name: 'qa', description: 'Quality Assurance DAO (QA-DAO) is an ongoing open source project that provides support for and is funded by the Cardano Project Catalyst Community.'},
        {name: 'recruiters', description: 'Recruitment for QA testers of all types. Our QA recruiters can find your perfect match for any level of experience or skill set requirements. Whether you need a manual or automated tester, employee (W2) or contractor (1099), website, software, or iOS/Android mobile app testing, we’re here to help you and your Engineering team find the right fit.'},
        {name: 'finmaker', description: 'Dai is a stable, decentralized currency that does not discriminate. Any individual or business can realize the advantages of digital money.'},
        {name: 'Mexico Trip', description: 'DAO of Mexico Trip 14 jul 2022'},
    ]

    let existing_dao_addrs = await contract.methods.getAllDAOs().call() || []
    let existing_dao_names = []
    for (let i = 0; i < existing_dao_addrs.length; i++) {
        const dao = await contract.methods.getDAO(existing_dao_addrs[i]).call();
        existing_dao_names.push(dao[0])
    }
    const account = getGlobalState('connectedAccount')

    for (let i = 0; i < DAO_NAMES.length; i++) {
        if (!existing_dao_names.includes(DAO_NAMES[i].name)) {
            await contract.methods.createDAO(
                DAO_NAMES[i].name,
                DAO_NAMES[i].description
            ).send({from: account});
            existing_dao_addrs = await contract.methods.getAllDAOs().call() || []
            const last = existing_dao_addrs[existing_dao_addrs.length -1]
            await contract.methods.addDefaultMembersToDAO(last).send({from: account});
        }
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
    listVoters,
    createInitialData,
}
