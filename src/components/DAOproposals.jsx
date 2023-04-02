import Identicon from 'react-identicons'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import {truncate, daysRemaining} from '../store'
import "../styles/DAOproposals.css"


const DAOProposals = ({data}) => {
    const [proposals, setProposals] = useState(data)

    const deactive = `bg-transparent
  text-blue-600 font-medium text-xs leading-tight
  uppercase hover:bg-blue-700 focus:bg-blue-700
  focus:outline-none focus:ring-0 active:bg-blue-600
  transition duration-150 ease-in-out overflow-hidden
  border border-blue-600 hover:text-white focus:text-white`

    const getAll = () => setProposals(data)

    const getOpened = () =>
        setProposals(
            data.filter(
                (proposal) => !proposal.executed
            )
        )

    const getClosed = () =>
        setProposals(
            data.filter(
                (proposal) => proposal.executed
            )
        )

    return (
        <div>
            <div>
                <button
                    aria-current="page"
                    className={`rounded-l-full px-6 py-2.5 ${deactive}`}
                    onClick={getAll}
                >
                    All
                </button>
                <button
                    aria-current="page"
                    className={`px-6 py-2.5 ${deactive}`}
                    onClick={getOpened}
                >
                    Open
                </button>
                <button
                    aria-current="page"
                    className={`rounded-r-full px-6 py-2.5 ${deactive}`}
                    onClick={getClosed}
                >
                    Closed
                </button>
            </div>
            <br/>
            <div>
                <table className="proposals-table">
                    <thead>
                    <tr>
                        <th>Created By</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {proposals.map((proposal, id) => (
                        <tr
                            key={id}
                        >
                            <td>
                                <div className="flex">
                                    <Identicon
                                        string={proposal.initiator.toLowerCase()}
                                        size={25}
                                        className="h-10 w-10 object-contain rounded-full mr-3"
                                    />
                                    <span>{truncate(proposal.initiator, 4, 4, 11)}</span>
                                </div>
                            </td>
                            <td>
                                {proposal.title}
                            </td>
                            <td>
                                {proposal.description.substring(0, 80) + '...'}
                            </td>
                            <td>
                                <Link
                                    to={'/proposal/' + proposal.id}
                                >
                                    <b>View</b>
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export default DAOProposals;
