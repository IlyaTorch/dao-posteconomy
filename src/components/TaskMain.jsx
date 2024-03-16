import React, {useEffect, useState} from "react";
import "../styles/TaskMain.css";
import 'openlaw-elements/dist/openlaw-elements.min.css';
import {TaskStatus, taskStatusToString} from "../utils";
import {Link} from "react-router-dom";
import {fetchTasks, fetchUpdateTask, fetchUser} from "../PosteconomyV2";
import CreateTaskModal from "./CreateTaskModal";


const TaskMain = ({dao_addr, task_id}) => {
    const [task, setTask] = useState({executors: []})

    const loadTask = async (dao_addr, task_id) => {
        const resp = await fetchTasks(dao_addr)
        const tasks = resp.tasks
        const t = tasks.filter(t => t.task_id === task_id)[0]
        const user = await fetchUser(t.executors[0])
        t.avatar_url = user.avatar_url
        return t
    }

    useEffect(() => {
        const loadData = async () => {
            setTask(await loadTask(dao_addr, task_id))
        }
        loadData().catch(console.error)
    }, []);

    return (
        <div>
            <Link to={`/dashboards/${dao_addr}`}><h1 className="tasks-header-task">Tasks</h1></Link>
            <div className="task-main">
                <h1 className="task-header">{task.title}</h1>
                <div className="task-short">
                    <div className="task-status"><b>{taskStatusToString(task.task_status)}</b></div>
                    <Link to={`/users/${task.executors[0]}`}>
                        <div>
                            <img src={task.avatar_url} alt=""/>
                        </div>
                    </Link>
                    <div className="share">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Outline/Communication/Forward">
                            <path id="Icon" fillRule="evenodd" clipRule="evenodd" d="M2.46014 16.8188C2.23856 16.589 2.1867 16.2442 2.33091 15.9594L3.03241 14.574C4.69268 11.2952 8.05563 9.22856 11.7308 9.22856H12.0757C12.1009 8.68218 12.1334 8.13605 12.1731 7.59032L12.241 6.65969C12.2961 5.90287 13.14 5.4798 13.7795 5.88838C15.8771 7.22874 17.7007 8.95583 19.153 10.9776L19.6091 11.6125C19.797 11.874 19.797 12.2262 19.6091 12.4877L19.153 13.1226C17.7007 15.1444 15.8771 16.8714 13.7795 18.2118C13.14 18.6204 12.2961 18.1973 12.241 17.4405L12.1731 16.5099C12.1256 15.8581 12.0886 15.2058 12.0619 14.5532C9.91207 14.4912 7.76486 14.9251 5.7915 15.8359L3.31431 16.9792C3.02447 17.1129 2.68173 17.0486 2.46014 16.8188ZM4.67839 14.6976L5.16291 14.4739C7.57405 13.3611 10.2196 12.8913 12.8447 13.0929C13.227 13.1223 13.5256 13.4353 13.5369 13.8186C13.5624 14.6799 13.6065 15.5409 13.6692 16.4008L13.6746 16.4753C15.3181 15.3136 16.7583 13.8852 17.9348 12.2475L18.0766 12.0501L17.9348 11.8527C16.7583 10.215 15.3181 8.78658 13.6746 7.62492L13.6692 7.69938C13.6132 8.46699 13.5721 9.2354 13.5458 10.0042C13.532 10.4082 13.2005 10.7286 12.7962 10.7286L11.7308 10.7286C8.83352 10.7286 6.16555 12.2465 4.67839 14.6976Z" fill="black"/>
                            </g>
                        </svg>
                        Share
                    </div>
                </div>
                <div className="task-description">{task.description}</div>
                <br/>
                <div className="task-due-date">
                    Due Date: {task.due_date}
                </div>
            </div>
        </div>
    )
};

export default TaskMain;
