import "../styles/UserDetails.css";
import UserItem from "./UserItem";
import {useEffect, useState} from "react";
import {fetchDAO, fetchUser, fetchUserVotes, getDAOproposals} from "../PosteconomyV2";
import {Link} from "react-router-dom";


const UserDetails = ({user_addr}) => {
    const [votes, setVotes] = useState([])
    const [user, setUser] = useState({})

    useEffect(() => {
        const loadData = async () => {
            const user_votes = await fetchUserVotes(user_addr)
            for (let i = 0; i < user_votes.length; i++) {
                const v = user_votes[i]
                const dao_proposals = await getDAOproposals(v.dao_addr)
                const vote_details = dao_proposals.filter(p => p.id === v.proposal_id)[0]
                const dao_additional_details = await fetchDAO(v.dao_addr)

                v.proposal_title = vote_details.title
                v.proposal_description = vote_details.description
                v.executed = vote_details.executed
                v.votes_for = vote_details.votesFor
                v.votes_against = vote_details.votesAgainst
                v.creator_avatar = vote_details.creator_avatar
                v.creator_username = vote_details.creator_username
                v.creator_addr = vote_details.creator_addr
                v.dao_avatar = dao_additional_details.dao_avatar
            }
            setVotes(user_votes)

            const user = await fetchUser(user_addr)
            setUser(user)
        }

        loadData().catch(console.log)
    }, [user_addr])

    return (
        <div className="user-page">
            <div className="user-page-short-info">
                <UserItem addr={user_addr}/>
            </div>
            <div className="user-page-main">
                <h1 className="user-votes-header">Votes</h1>
                <div className="user-votes">{
                    votes.map(vote => (
                        <div key={vote.proposal_id} className="user-vote-item">
                            <div className="header">
                                <Link to={`/dao/${vote.dao_addr}`}>
                                <img src={vote.dao_avatar} alt={user.username}/>
                                 <span className="title">{vote.proposal_title}</span>
                                </Link>
                                <div className={vote.votes_against > vote.votes_for ? "not-" : "" + "accepted"}>{vote.votes_against > vote.votes_for ? "not " : ""}accepted</div>
                            </div>
                            <div>Voted {vote.choice ? "for" : "against"}, {vote.sum} ETH</div>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
};

export default UserDetails;
