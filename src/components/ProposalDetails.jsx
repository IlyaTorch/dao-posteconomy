import moment from 'moment'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
} from 'recharts'
import {getDAOproposals, getProposal, isMember, voteOnProposal, listVoters} from '../PosteconomyV2'
import {useGlobalState} from '../store'

const ProposalDetails = () => {
    const {addr, id} = useParams()
    const [proposal, setProposal] = useState(null)
    const [data, setData] = useState([])
    const [daoMember, setDaoMember] = useState(false)
    const [connectedAccount] = useGlobalState('connectedAccount')
    const [voted, setVoted] = useState(false)
    useEffect(() => {
        isMember(addr, connectedAccount).then(res => setDaoMember(res));
        getDAOproposals(addr).then(_ => {
            getProposal(parseInt(id)).then(prop => {
                setProposal(prop);
                setData([
                    {
                        name: 'Votes',
                        Acceptees: prop?.votesFor,
                        Rejectees: prop?.votesAgainst,
                    },
                ])
            });
        });

        listVoters(addr, id).then(res => res.map(x => x.voter).includes(connectedAccount)).then(voter => setVoted(voter))
    }, [id])

    const onVote = (choice) => {
        voteOnProposal(addr, parseInt(id), choice).then((res) => {
            if (!!!res.code) {
                toast.success('Voted successfully!')
                window.location.reload()
            }
        })
    }

    const daysRemaining = (days) => {
        const todaysdate = moment()
        days = Number((days + '000').slice(0))
        days = moment(days).format('YYYY-MM-DD')
        days = moment(days)
        days = days.diff(todaysdate, 'days')
        return days == 1 ? '1 day' : days + ' days'
    }

    return (
        <div className="p-8">
            <h2 className="font-semibold text-3xl mb-5">{proposal?.title}</h2>
            <p>
                This proposal was initiated by the <strong>{proposal?.initiator}</strong>
            </p>
            <hr className="my-6 border-gray-300"/>
            <p>{proposal?.description}</p>
            <div className="flex flex-row justify-start items-center w-full mt-4 overflow-auto">
                <BarChart width={730} height={250} data={data}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Bar dataKey="Acceptees" fill="#2563eb"/>
                    <Bar dataKey="Rejectees" fill="#dc2626"/>
                </BarChart>
            </div>
            <div
                className="flex flex-row justify-start items-center space-x-3 mt-4"
                role="group"
            >
                {daoMember && !voted ? (
                    <>
                        <button
                            type="button"
                            className="inline-block px-6 py-2.5
            bg-blue-600 text-white font-medium text-xs
              leading-tight uppercase rounded-full shadow-md
              hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
              focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-blue-800 active:shadow-lg transition
              duration-150 ease-in-out dark:text-gray-300
              dark:border dark:border-gray-500 dark:bg-transparent"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            onClick={() => onVote(true)}
                        >
                            Accept
                        </button>
                        <button
                            type="button"
                            className="inline-block px-6 py-2.5
            bg-blue-600 text-white font-medium text-xs
              leading-tight uppercase rounded-full shadow-md
              hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700
              focus:shadow-lg focus:outline-none focus:ring-0
              active:bg-blue-800 active:shadow-lg transition
              duration-150 ease-in-out
              dark:border dark:border-gray-500 dark:bg-transparent"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            onClick={() => onVote(false)}
                        >
                            Reject
                        </button>


                    </>
                ) : null}


            </div>
        </div>
    )
}

export default ProposalDetails
