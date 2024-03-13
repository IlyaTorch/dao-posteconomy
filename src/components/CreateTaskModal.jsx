import React, {useState} from "react";
import "../styles/CreateTaskModal.css";
import 'openlaw-elements/dist/openlaw-elements.min.css';
import {fetchCreateTask} from "../PosteconomyV2";


const CreateTaskModal = ({dao_addr, onClose}) => {
    const [task_data, setTaskData] = useState({
        dao_addr: dao_addr,
        title: '',
        description: '',
        task_status: 0,  // 0-to_do, 1-in progress, 2-done
        executors: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({ ...task_data, [name]: value });
    };


    const createTask = async () => {
        const data = {...task_data}
        data.executors = task_data.executors.split(',')
        await fetchCreateTask(dao_addr, data)
        onClose()
    }

    return (
        <div className="create-task">
            <h1 className="create-task-header">Add Task</h1>
            <input
                className="create-task-input"
                type="text"
                placeholder="Enter the task title"
                onChange={handleChange}
                name="title"
                value={task_data.title}
                required
            />
            <textarea
                className="create-task-input"
                placeholder="Enther the task description"
                onChange={handleChange}
                name="description"
                value={task_data.description}
                required
            />
            <input
                className="create-task-input"
                type="text"
                placeholder="Separate executors with commas"
                onChange={handleChange}
                name="executors"
                value={task_data.executors}
                required
            />
            <br/>
            <button
                className="create-task-button"
                onClick={createTask}
            >
                Add
            </button>
        </div>
    )
};

export default CreateTaskModal;
