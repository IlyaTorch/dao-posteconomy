import React from "react";
import "../styles/DAOAbout.css";

const DAOAbout = ({description, administrators}) => {
    return (
        <div className="dao-about-container">
            <h1 className="dao-about-header">About</h1>
            <div className="dao-about-item">
                <h2>Description</h2>
                <div>{description}</div>
            </div>
            <div className="dao-about-item">
                <h2>Administrators</h2>
                <div>{
                    administrators.map(admin => (
                        <div className="dao-about-admin">
                            <img src={admin.avatar}/>
                            <span>{admin.name}</span>
                        </div>
                    ))
                }</div>
            </div>
        </div>
    )
};


export default DAOAbout;
