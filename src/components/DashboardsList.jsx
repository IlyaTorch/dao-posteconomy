import React from "react";
import "../styles/DashboardsList.css";
import 'openlaw-elements/dist/openlaw-elements.min.css';
import {calcStatus, taskStatusToString} from "../utils";
import {getGlobalState} from "../store";
import {Link} from "react-router-dom";


const DashboardsList = () => {
    const daos= getGlobalState('daos')

    return (
        <div className="dashboards">
            <h1 className="dashboards-header">Dashboards</h1>
            <div className="dashboards-list">
                {daos.map(dao =>
                    <div className="dashboards-item">
                        <Link to={`/dashboards/${dao.dao_addr}`}>
                            <img src={dao.dao_avatar} alt=""/>
                            <span>{dao.title}</span>
                        </Link>
                        <div>{taskStatusToString(calcStatus(dao))}</div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default DashboardsList;
