import Web3 from "web3";
import {fetchUser} from "./PosteconomyV2";
import user from "./views/User";


const ProposalStatus = {
    Voting: 0,
    Rejected:1,
    Work_On_Contract: 2,
    performers_selection: 3,
    WIP: 4,
    finished: 5
}


const TaskStatus = {
    todo: 0,
    in_progress:1,
    done: 2,
}

const Role = {
    investor: 'Investor',
    service_provider: 'Service Provider',
    client: 'Client',
    initiator: 'Initiator',
}


const calcRewards = async (dao) => {
    const contract_balance = await web3.eth.getBalance(dao.dao_addr)
    const weights = {
        'initiator': 30,
        'investors': 50,
        'services_providers': 20,
    }
    const rewards = {}
    const investors = []
    const services_providers = []

    const users = Object.keys(dao.users)
    for (let i = 0; i < users.length; i++) {
        const u = users[i]
        const role = calcRole(dao, u)
        if (role === Role.investor) investors.push(u)
        if (role === Role.service_provider) services_providers.push(u)
    }

    for (let i = 0; i < users.length; i++) {
        const u = users[i]
        const role = calcRole(dao, u)
        if (role === Role.initiator) {
            console.log('initiator Reward is', contract_balance * (weights['initiator'] / 100))
            rewards[Role.initiator] = contract_balance * (weights['initiator'] / 100)
        }
        else if (role === Role.investor) {
            console.log('investor Reward is', (contract_balance * (weights['investors'] / 100)) / investors.length)
            rewards[Role.investor] = (contract_balance * (weights['investors'] / 100)) / investors.length
        }
        else if (role === Role.service_provider) {
            console.log('service_provider Reward is', (contract_balance * (weights['services_providers'] / 100)) / services_providers.length)
            rewards[Role.service_provider] = (contract_balance * (weights['services_providers'] / 100)) / services_providers.length
        }
    }

    return rewards
}



const calcRole = (dao_details, user_addr) => {
    if (user_addr === dao_details.members_list[0]) { // initiator
        return Role.initiator
    }
    if (dao_details.users && dao_details.users[user_addr]) {
        return Role[dao_details.users[user_addr]]
    }
    if (dao_details.title === 'Browser programming language') {
        return Role.service_provider
    }
    return Role.client
}

const calcStatus = (dao) => {
    const statuses = []
    for (let i=0; i < dao.tasks.length; i++) {
        statuses.push(dao.tasks[i].task_status);
    }
    if (statuses.length === 0) {
        return TaskStatus.todo
    }
    const unique = [...new Set(statuses)];
    if (unique.length === 1) {
        return unique[0]
    }
    return TaskStatus.in_progress
}


const taskStatusToString = (task_status) => {
    if (task_status === TaskStatus.todo) {
        return 'ToDo'
    }
    if (task_status === TaskStatus.in_progress) {
        return 'In Progress'
    }
    if (task_status === TaskStatus.done) {
        return 'Done'
    }
}

function getStatusName(status) {
  const statusKeys = Object.keys(ProposalStatus);
  const statusValues = Object.values(ProposalStatus);
  const index = statusValues.indexOf(status);
  return index !== -1 ? statusKeys[index] : null;
}


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
            status: getStatusName(parseInt(prop[11])),
            status_int: parseInt(prop[11]),
            voted: parseInt(prop[4]) + parseInt(prop[5])
        }
};


const proposalDetailToObj = (prop) => {
    return {
        title: prop[0],
        description: prop[1],
        votes_count: parseInt(prop[2]) + parseInt(prop[3]),
        amount: prop[5],
        author_addr: prop[6],
        start: prop[7],
        end: prop[8],
        status: getStatusName(parseInt(prop[9])),
        status_int: parseInt(prop[9]),
        votes: prop[10].map(vote => {
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
    ProposalStatus,
    TaskStatus,
    Role,
    calcStatus,
    calcRole,
    calcRewards,
    taskStatusToString,
}
