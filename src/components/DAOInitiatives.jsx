import React, {useState} from "react";
import "../styles/DAOInitiatives.css";
import {Link} from "react-router-dom";

const DAOInitiatives = ({initiatives}) => {
    const [proposals, setProposals] = useState(initiatives)


    return (
        <div className="dao-initiatives-container">
            <h1 className="dao-initiatives-header">Initiatives</h1>
            <div className="dao-initiatives-list">
            {
                proposals.map(initiative =>
                    <div className="dao-initiative">
                        <div className="dao-initiative-header">
                            <Link to={`proposal/${initiative.id}`}>
                            <div className="dao-initiative-creator">
                                <img src={initiative.creator_avatar}/>
                                <span>{initiative.creator}</span>
                            </div>
                            </Link>
                            <div className="dao-initiative-status">{initiative.status}</div>
                        </div>
                        <Link to={`proposal/${initiative.id}`}><h2>{initiative.title}</h2></Link>
                        <div>{initiative.description}</div>
                        <br/>
                        <div>Voted: {initiative.voted}</div>
                    </div>
                )
            }
            </div>
        </div>
    )
};


export default DAOInitiatives;
