import React from "react";
import "../styles/DAOMembers.css";
import {Link} from "react-router-dom";

const DAOMembers = ({members}) => {

    return (
        <div className="dao-members">
            <div className="members-header">
                <span className="members-title">Members</span>
                <span className="members-count">{members?.length}</span>
            </div>
            <div className="list">
            {
                members?.map(member =>
                <Link to={`/users/${member.address}`}>
                    <div className="dao-member">
                        <div className="dao-member-avatar">
                            <img src={member.avatar_url}/>
                        </div>
                        <div className="dao-member-name">{member.username}</div>
                        <div className="dao-member-role"><b>{member.role}</b></div>
                        <div className="dao-member-address">{`${member.address.substring(0,15)}...`}</div>
                    </div>
                </Link>
                )
            }
            </div>
        </div>
    )
};


export default DAOMembers;
