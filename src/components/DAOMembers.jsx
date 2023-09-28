import React from "react";
import "../styles/DAOMembers.css";

const DAOMembers = ({members}) => {

    return (
        <div>
            <h1 className="dao-members-header">Members</h1>
            <div className="dao-members-container">
            {
                members.map(member =>
                    <div className="dao-member">
                        <div className="dao-member-avatar">
                            <img src={member.avatar}/>
                        </div>
                        <div className="dao-member-name">{member.name}</div>
                        <div className="dao-member-email">{member.email}</div>
                    </div>
                )
            }
            </div>
        </div>
    )
};


export default DAOMembers;
