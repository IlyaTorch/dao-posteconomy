import React, {useEffect, useState} from "react";
import "../styles/DashboardsList.css";
import 'openlaw-elements/dist/openlaw-elements.min.css';
import {calcStatus, ProposalStatus, taskStatusToString} from "../utils";
import {getGlobalState, setGlobalState} from "../store";
import {Link} from "react-router-dom";
import {fetchTasks, getDAOproposals} from "../PosteconomyV2";


const DashboardsList = () => {
    const [daos, setDaos] = useState([])

    useEffect(() => {
        const loadData = async () => {
            const daos_list= (getGlobalState('daos') || [])
            for (let i = 0; i < daos_list.length; i++) {
                const daoAddr = daos_list[i].dao_addr
                const proposals = await getDAOproposals(daoAddr)
                const tasks_resp = await fetchTasks(daoAddr)
                daos_list[i].tasks = tasks_resp.tasks || []
                if (proposals[0].status_int === ProposalStatus.WIP) {
                    setDaos([...daos, daos_list[i]])
                }
            }
        }
        loadData().catch(console.log)
    }, []);


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
                        <div><b>{taskStatusToString(calcStatus(dao))}</b></div>
                    </div>
                )}
            </div>
        </div>
    )
};

export default DashboardsList;
