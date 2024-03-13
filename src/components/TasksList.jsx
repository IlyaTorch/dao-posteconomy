import React, {useEffect, useState} from "react";
import "../styles/TasksList.css";
import 'openlaw-elements/dist/openlaw-elements.min.css';
import {taskStatusToString} from "../utils";
import {Link} from "react-router-dom";
import {fetchTasks, fetchUser} from "../PosteconomyV2";
import CreateTaskModal from "./CreateTaskModal";


const TasksList = ({dao_addr}) => {
    const [tasks, setTasks] = useState([])
    const [is_modal_active, setIsModalActive] = useState(false)

    const loadTasks = async (dao_addr) => {
        const resp = await fetchTasks(dao_addr)
        const tasks = resp.tasks
        for (let i = 0; i < tasks.length; i++) {
            const user = await fetchUser(tasks[i].executors[0])
            tasks[i].avatar_url = user.avatar_url
        }
        return tasks
    }

    useEffect(() => {
        const loadData = async () => {
            const tasks = await loadTasks(dao_addr)
            setTasks(tasks)
        }
        loadData().catch(console.error)
    }, []);

    const onAddTask = async () => {
        setIsModalActive(true)
    }

    const onClose = async () => {
        setIsModalActive(false)
        const tasks = await loadTasks(dao_addr)
        setTasks(tasks)
        setTasks(tasks)
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
                                <img src={task.avatar_url}/>
                            </span>
                            <span>{task.comments.pop()}</span>
                        </Link>
                        <div></div>
                    </div>
                )}
            </div>
            <button
                className="tasks-add"
                onClick={onAddTask}
            >
                Add Task
            </button>
        </div>
    )
};

export default TasksList;
