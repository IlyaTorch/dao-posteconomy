import React from "react";
import "../styles/CreateTaskModal.css";
import 'openlaw-elements/dist/openlaw-elements.min.css';
import {fetchCreateTask} from "../PosteconomyV2";


const CreateTaskModal = ({dao_addr, onClose}) => {
    const createTask = async () => {
        await fetchCreateTask(dao_addr)
        onClose()
    }

    return (
        <div className="create-task">
            <h1 className="create-task-header">Tasks</h1>
            <button onClick={createTask}>Add Task</button>
        </div>
    )
};

export default CreateTaskModal;
