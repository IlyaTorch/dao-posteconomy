import React, {useEffect, useState} from "react";
import "../styles/TasksList.css";
import 'openlaw-elements/dist/openlaw-elements.min.css';
import {calcStatus, taskStatusToString} from "../utils";
import {getGlobalState} from "../store";
import {Link} from "react-router-dom";
import {fetchCreateTask, fetchDAO, fetchTasks, getProposalDetails} from "../PosteconomyV2";
import CreateTaskModal from "./CreateTaskModal";


const TasksList = ({dao_addr}) => {
    const [tasks, setTasks] = useState([])
    const [is_modal_active, setIsModalActive] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            const resp = await fetchTasks(dao_addr)
            setTasks(resp.tasks)
        }
        loadData().catch(console.error)
    }, []);

    const onAddTask = async () => {
        setIsModalActive(true)
    }

    const onClose = async () => {
        setIsModalActive(false)
        const resp = await fetchTasks(dao_addr)
        setTasks(resp.tasks)
    }

    return (
        <div className="tasks">
            {is_modal_active && <CreateTaskModal dao_addr={dao_addr} onClose={onClose}/>}
            <h1 className="tasks-header">Tasks</h1>
            <div className="tasks-list">
                {tasks.map(task =>
                    <div className="tasks-item">
                        <Link to={`/${task.dao_addr}/tasks/${task.task_id}`}>
                            <span>{task.title}</span>
                            <span>{taskStatusToString(task.task_status)}</span>
                            <span>
                                <img src={task.executors[0]}/>
                            </span>
                            <span>{task.comments.pop()}</span>
                        </Link>
                        <div></div>
                    </div>
                )}
            </div>
            <button onClick={onAddTask}>Add Task</button>
        </div>
    )
};

export default TasksList;
