import {useState, useEffect} from "react";
import {fetchDAO, fetchUser, getDAO, getProposalDetails} from "../PosteconomyV2";
import {getGlobalState} from "../store";
import "../styles/DAOMain.css";
import {Link} from "react-router-dom";


const DAOMain = ({addr, id}) => {
    const default_data = {status: ""}
    const [data, setData] = useState(default_data)
    const [dao_title, setTitle] = useState(undefined)
    useEffect(() => {
        const loadData = async () => {
            const proposal_details = await getProposalDetails(addr, parseInt(id))
            const author = await fetchUser(proposal_details.author_addr)
            proposal_details.author_name = author.username
            proposal_details.author_avatar = author.avatar_url
            for (let i = 0; i < proposal_details.votes.length || 0; i++) {
                const vote = proposal_details.votes[i]
                const u = await fetchUser(vote.user_addr)
                vote.user_avatar = u.avatar_url
            }
            const dao_details = await getDAO(addr)
            const dao_additional_details = await fetchDAO(addr)
            const user_addr = getGlobalState("connectedAccount")
            const user = await fetchUser(user_addr)

            setTitle(dao_details.title)
            setData({...data, ...proposal_details, dao_avatar: dao_additional_details.dao_avatar})
        }
        loadData().catch(console.error)
    }, []);
    const {title, status, description, start, end, author_avatar, author_name, author_addr} = data

    return (
        <div className="dao-main">
            <div className="short">
                <div className={"status " + (status.toLowerCase() === "executed" ? "executed" : "")}>{status}</div>
                <Link to={`/users/${author_addr}`}>
                    <div>
                        <img src={author_avatar} alt=""/>
                        <span>{author_name}</span>
                    </div>
                </Link>
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
            <div className="date">
                Start Date: {start}
            </div>
            <div className="date">
                End Date: {end}
            </div>

        </div>
    )
};

export default DAOMain;
