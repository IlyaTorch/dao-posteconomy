import {useState, useEffect} from "react";
import {fetchUser, getProposalDetails, listVoters, voteOnProposal} from "../PosteconomyV2";
import {toast} from "react-toastify";
import "../styles/DAOVotes.css"
import {Link} from "react-router-dom";


const DAOVotes = ({addr, id}) => {
    const [votes, setVotes] = useState([])
    const [user_data, setUserData] = useState({})

    useEffect(() => {
        const loadData = async () => {
            const proposal_details = await getProposalDetails(addr, parseInt(id))
            for (let i = 0; i < proposal_details.votes.length || 0; i++) {
                const vote = proposal_details.votes[i]
                const u = await fetchUser(vote.user_addr)
                vote.user_avatar = u.avatar_url
            }
            setVotes([...proposal_details.votes])
        }
        loadData().catch(console.error)
    }, []);

        const onVote = async (amount) => {
        const res = await voteOnProposal(
            addr,
            parseInt(id),
            amount,
            user_data.username,
            user_data.address,
        )
        if (!!!res.code) {
            toast.success('Voted successfully!')
            window.location.reload()
        }
    }

    return (
        <div className="dao-votes">
            <div className="votes">
                <div className="votes-header">
                    <span className="votes-title">Votes</span>
                    <span className="votes-count">{votes?.length}</span>
                </div>
                {
                votes?.map(vote => (
                    <div className="vote-item">
                        <Link to={`/users/${vote.user_addr}`}>
                            <div className="user-vote">
                                <img src={vote.user_avatar} alt=""/>
                                <span>{vote.username}</span>
                            </div>
                        </Link>
                        <div>{vote.vote}</div>
                        <div>{vote.sum}</div>
                    </div>
                ))
            }</div>
            <div className="vote">
                <h2>Vote up or down</h2>
                <hr/>
                <div onClick={() => onVote(3)}>Vote UP (3 ETH)</div>
                <div onClick={() => onVote(0)}>Vote Down</div>
            </div>
        </div>
    )
};

export default DAOVotes;
