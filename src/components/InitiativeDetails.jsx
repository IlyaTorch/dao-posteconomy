import "../styles/InitiativeDetails.css";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {getDAO, getProposalDetails, listVoters, voteOnProposal} from "../PosteconomyV2";
import {toast} from "react-toastify";
import {generateUsername} from "unique-username-generator";
import {prepareMembers} from "../utils";


const InitiativeDetails = () => {
    const {addr, id} = useParams();
    const default_data = {
        "title": "Proposal for New Project",
        "dao_avatar": "https://robohash.org/1?set=set2&size=180x180",
        "status": "Active",
        "description": "This proposal aims to initiate a new project that will focus on developing a decentralized finance platform.This proposal aims to initiate a new project that will focus on developing a decentralized finance platform.This proposal aims to initiate a new project that will focus on developing a decentralized finance platform.This proposal aims to initiate a new project that will focus on developing a decentralized finance platform.This proposal aims to initiate a new project that will focus on developing a decentralized finance platform.This proposal aims to initiate a new project that will focus on developing a decentralized finance platform.This proposal aims to initiate a new project that will focus on developing a decentralized finance platform.This proposal aims to initiate a new project that will focus on developing a decentralized finance platform.This proposal aims to initiate a new project that will focus on developing a decentralized finance platform.",
        "votes_count": 120,
        "votes": [
            {
                "username": "John Doe",
                "user_avatar": "https://robohash.org/1?set=set2&size=180x180",
                "vote": "Voted Up",
                "sum": "3 ETH"
            },
            {
                "username": "Jane Smith",
                "user_avatar": "https://robohash.org/1?set=set2&size=180x180",
                "vote": "Voted Down",
                "sum": "0"
            }
        ],
        "author_name": "Alice Johnson",
        "author_avatar": "https://robohash.org/1?set=set2&size=180x180",
        "start": "2022-01-01T00:00:00Z",
        "end": "2022-01-31T00:00:00Z"
    }
    const [data, setData] = useState(default_data)
    const [dao_title, setTitle] = useState("")
    useEffect(() => {
        getProposalDetails(addr, parseInt(id)).then(
            res => setData({...data, ...res})
        )
        getDAO(addr).then(res => setTitle(res[0]));
    }, []);
    const {title, dao_avatar, status, description, votes_count, votes, author_name, author_avatar, start, end} = data
    const onVote = (amount) => {
        voteOnProposal(
            addr,
            parseInt(id),
            amount,
            generateUsername('',1, 10),
            "https://robohash.org/190?set=set2&size=180x180"
        ).then((res) => {
            if (!!!res.code) {
                toast.success('Voted successfully!')
                window.location.reload()
            }
        })
    }


    return (
        <div className="initiative-page">
            <div className="main">
                <div className="header">{title}</div>
                <div className="short">
                    <div className="status">{status}</div>
                    <div>
                        <img src={dao_avatar} alt=""/>
                        <span>{dao_title}</span>
                    </div>
                    <div className="share">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Outline/Communication/Forward">
                            <path id="Icon" fill-rule="evenodd" clip-rule="evenodd" d="M2.46014 16.8188C2.23856 16.589 2.1867 16.2442 2.33091 15.9594L3.03241 14.574C4.69268 11.2952 8.05563 9.22856 11.7308 9.22856H12.0757C12.1009 8.68218 12.1334 8.13605 12.1731 7.59032L12.241 6.65969C12.2961 5.90287 13.14 5.4798 13.7795 5.88838C15.8771 7.22874 17.7007 8.95583 19.153 10.9776L19.6091 11.6125C19.797 11.874 19.797 12.2262 19.6091 12.4877L19.153 13.1226C17.7007 15.1444 15.8771 16.8714 13.7795 18.2118C13.14 18.6204 12.2961 18.1973 12.241 17.4405L12.1731 16.5099C12.1256 15.8581 12.0886 15.2058 12.0619 14.5532C9.91207 14.4912 7.76486 14.9251 5.7915 15.8359L3.31431 16.9792C3.02447 17.1129 2.68173 17.0486 2.46014 16.8188ZM4.67839 14.6976L5.16291 14.4739C7.57405 13.3611 10.2196 12.8913 12.8447 13.0929C13.227 13.1223 13.5256 13.4353 13.5369 13.8186C13.5624 14.6799 13.6065 15.5409 13.6692 16.4008L13.6746 16.4753C15.3181 15.3136 16.7583 13.8852 17.9348 12.2475L18.0766 12.0501L17.9348 11.8527C16.7583 10.215 15.3181 8.78658 13.6746 7.62492L13.6692 7.69938C13.6132 8.46699 13.5721 9.2354 13.5458 10.0042C13.532 10.4082 13.2005 10.7286 12.7962 10.7286L11.7308 10.7286C8.83352 10.7286 6.16555 12.2465 4.67839 14.6976Z" fill="black"/>
                            </g>
                        </svg>

                        Share
                    </div>
                </div>
                <div className="description">{description}</div>
                <div className="vote">
                    <h2>Vote up or down</h2>
                    <hr/>
                    <div onClick={() => onVote(3)}>Vote UP (3 ETH)</div>
                    <div onClick={() => onVote(0)}>Vote Down</div>
                </div>
                <div className="votes">
                    <div className="votes-header">
                        <span className="votes-title">Votes</span>
                        <span className="votes-count">{votes_count}</span>
                    </div>
                    {
                    votes.map(vote => (
                        <div className="vote-item">
                            <div className="user-vote">
                                <img src={vote.user_avatar} alt=""/>
                                <span>{vote.username}</span>
                            </div>
                            <div>{vote.vote}</div>
                            <div>{vote.sum}</div>
                        </div>
                    ))
                }</div>
            </div>
            <div className="sidebar">
                <div className="info">
                    <h1>Information</h1>
                    <hr/>
                    <div className="author">
                        <h2>Author</h2>
                        <img src={author_avatar} alt=""/>
                        <span>{author_name}</span>
                    </div>
                    <div className="date">
                        Start Date: {start}
                    </div>
                    <div className="date">
                        End Date: {end}
                    </div>
                </div>
                <div className="results">

                </div>
                <div className="buttons">
                    <div>Stats</div>
                    <div>Discussions</div>
                </div>
            </div>
        </div>
    )
};

export default InitiativeDetails;
