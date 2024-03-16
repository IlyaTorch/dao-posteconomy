import {useParams} from "react-router-dom";
import Header from "../components/Header";
import SidebarPanel from "../components/SidebarPanel";
import "../styles/TaskPage.css";
import TaskMain from "../components/TaskMain";


const TaskPage = () => {
    const {addr, task_id} = useParams()

    return (
        <>
            <Header/>
            <div className="container">
                <SidebarPanel/>
                <TaskMain dao_addr={addr} task_id={parseInt(task_id)}/>
            </div>
        </>
    )
};

export default TaskPage;
