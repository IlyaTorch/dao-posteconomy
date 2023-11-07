import React from "react";
import "../styles/DAOMembers.css";

const DAOMembers = ({members}) => {

    return (
        <div className="dao-members-container">
            <h1 className="dao-members-header">Members</h1>
            <div className="dao-members-list">
            {
                members.map(member =>
                    <div className="dao-member">
                        <div className="dao-member-avatar">
                            <img src={member.avatar_url}/>
                        </div>
                        <div className="dao-member-name">{member.username}</div>
                        <div className="dao-member-address">{`${member.address.substring(0,15)}...`}</div>
                    </div>
                )
            }
            </div>
        </div>
    )
};


export default DAOMembers;
