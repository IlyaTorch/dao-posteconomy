import Header from "../components/Header";
import SidebarPanel from "../components/SidebarPanel";
import "../styles/DAO.css";
import DashboardsList from "../components/DashboardsList";


const Dashboards = () => {
    return (
        <>
            <Header/>
            <div className="container">
                <SidebarPanel/>
                <DashboardsList/>
            </div>
        </>
    )
};

export default Dashboards;
