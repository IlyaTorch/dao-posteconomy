import {useParams} from "react-router-dom";
import Header from "../components/Header";
import DAOdetails from "../components/DAOdetails";
import {useGlobalState} from "../store";
import SidebarPanel from "../components/SidebarPanel";
import "../styles/DAO.css";


const DAO = () => {
    const {addr} = useParams()
    const [daos] = useGlobalState('daos');
    const id = daos.indexOf(addr)

    return (
        <>
            <Header/>
            <div className="container">
                <SidebarPanel/>
                <DAOdetails
                    daoId={id}
                    daoAddr={addr}
                />
            </div>

        </>
    )
};

export default DAO;
