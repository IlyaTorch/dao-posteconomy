import React from "react";
import "../styles/DAOInitiatives.css";
import {Link} from "react-router-dom";

const DAOInitiatives = ({proposals}) => {
    return (
        <div className="dao-initiatives-container">
            <h1 className="dao-initiatives-header">Initiative</h1>
            <div className="dao-initiatives-list">
            {
                proposals.map(prop =>
                    <div className="dao-initiative">
                        <div className="dao-initiative-header">
                            <Link to={`proposal/${prop.id}`}>
                            <div className="dao-initiative-creator">
                                <img src={prop.creator_avatar}/>
                                <span><b>{prop.creator_username}</b></span>
                            </div>
                            </Link>
                            <div className={"dao-initiative-status " + (prop.status === "executed" ? "executed" : "")}>
                                {prop.status}
                            </div>
                        </div>
                        <Link to={`proposal/${prop.id}`}><h2>{prop.title}</h2></Link>
                        <div>{prop.description}</div>
                        <br/>
                        <div>Voted: {prop.voted}</div>
                    </div>
                )
            }
            </div>
        </div>
    )
};


export default DAOInitiatives;
