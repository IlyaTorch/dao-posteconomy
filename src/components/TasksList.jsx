import React, {useEffect, useState} from "react";
import "../styles/TasksList.css";
import 'openlaw-elements/dist/openlaw-elements.min.css';
import {calcStatus, TaskStatus, taskStatusToString} from "../utils";
import {Link} from "react-router-dom";
import {completeProposal, fetchTasks, fetchUpdateTask, fetchUser, getDAO} from "../PosteconomyV2";
import CreateTaskModal from "./CreateTaskModal";


const TasksList = ({dao_addr}) => {
    const [title, setTitle] = useState('')
    const [tasks, setTasks] = useState([])
    const [is_modal_active, setIsModalActive] = useState(false)
    const [status, setStatus] = useState([TaskStatus.todo])

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
            setStatus(calcStatus({tasks: tasks}))
            const dao_details = await getDAO(dao_addr)
            setTitle(dao_details.title)
        }
        loadData().catch(console.error)
    }, []);

    const onAddTask = async () => {
        setIsModalActive(!is_modal_active)
    }

    const onCompleteInitiative = async () => {
        await completeProposal(dao_addr, "0xfE336C66Dc0D1a724a75bCA58dF6d04F442D46C1")
    }


    const onUpdateTask = async (task, value) => {
        task.task_status = value
        await fetchUpdateTask(dao_addr, task)
    }

    const onClose = async () => {
        setIsModalActive(false)
        const tasks = await loadTasks(dao_addr)
        setTasks(tasks)
    }

    return (
        <div className="tasks">
            {is_modal_active && <CreateTaskModal dao_addr={dao_addr} onClose={onClose}/>}
            <h1 className="tasks-header">Tasks. {title}</h1>
            <div className="tasks-list">
                {tasks.map(task =>
                    <div className="tasks-item">
                        <Link to={`/dashboards/${task.dao_addr}/tasks/${task.task_id}`}>
                            <span>{task.title}</span>
                        </Link>
                        <Link to={`/users/${task.executors[0]}`}>
                            <span><img src={task.avatar_url}/></span>
                        </Link>
                        <span>
                            <select
                                onChange={e => onUpdateTask(task, e.target.value)}
                            >
                                <option
                                    value={TaskStatus.todo}
                                    selected={TaskStatus.todo === task.task_status}
                                >
                                    {taskStatusToString(TaskStatus.todo)}
                                </option>
                                <option
                                    value={TaskStatus.in_progress}
                                    selected={TaskStatus.in_progress === task.task_status}
                                >
                                    {taskStatusToString(TaskStatus.in_progress)}
                                </option>
                                <option
                                    value={TaskStatus.done}
                                    selected={TaskStatus.done === task.task_status}
                                >
                                    {taskStatusToString(TaskStatus.done)}
                                </option>
                            </select>
                        </span>
                    </div>
                )}
            </div>
            <button
                className="tasks-add"
                onClick={onAddTask}
            >
                Add Task
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {status === TaskStatus.done && <button
                className="tasks-complete"
                onClick={onCompleteInitiative}
            >
                Complete Initiative
            </button>}
        </div>
    )
};

export default TasksList;
