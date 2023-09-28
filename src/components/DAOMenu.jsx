import React from "react";
import "../styles/DAOMenu.css";
import { setGlobalState, getGlobalState } from '../store'


const DAOMenu = () => {
    return (
        <div className="dao-menu">
            <div
                className={"dao-menu-item " + (getGlobalState('daoDetailsMenuItem') === 'initiatives' ? 'item-active' : '')}
                onClick={() => {
                setGlobalState('daoDetailsMenuItem', 'initiatives')
            }}>Initiatives</div>
            <div className="dao-menu-item">Stats</div>
            <div
                className={"dao-menu-item " + (getGlobalState('daoDetailsMenuItem') === 'members' ? 'item-active' : '')}
                onClick={() => {
                setGlobalState('daoDetailsMenuItem', 'members')
            }}>Members</div>
            <div className="dao-menu-item">About</div>
        </div>
    )
};


export default DAOMenu;
