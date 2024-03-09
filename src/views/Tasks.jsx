import {useParams} from "react-router-dom";
import Header from "../components/Header";
import SidebarPanel from "../components/SidebarPanel";
import "../styles/DAO.css";
import DashboardsList from "../components/DashboardsList";
import TasksList from "../components/TasksList";


const Tasks = () => {
    const {addr} = useParams()
    const id = 0

    return (
        <>
            <Header/>
            <div className="container">
                <SidebarPanel/>
                <TasksList dao_addr={addr}/>
            </div>
        </>
    )
};

export default Tasks;
