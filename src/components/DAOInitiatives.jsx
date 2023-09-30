import React from "react";
import "../styles/DAOInitiatives.css";

const DAOInitiatives = ({initiatives}) => {

    return (
        <div className="dao-initiatives-container">
            <h1 className="dao-initiatives-header">Initiatives</h1>
            <div className="dao-initiatives-list">
            {
                initiatives.map(initiative =>
                    <div className="dao-initiative">
                        <div className="dao-initiative-header">
                            <div className="dao-initiative-creator">
                                <img src={initiative.creator_avatar}/>
                                <span>{initiative.creator}</span>
                            </div>
                            <div className="dao-initiative-status">{initiative.status}</div>
                        </div>
                        <h2>{initiative.title}</h2>
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
