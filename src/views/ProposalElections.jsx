import {useParams} from "react-router-dom";
import Header from "../components/Header";
import DAOdetails from "../components/DAOdetails";
import {useGlobalState} from "../store";
import SidebarPanel from "../components/SidebarPanel";
import "../styles/DAO.css";
import ElectionDetails from "../components/ElectionDetails";


const ProposalElections = () => {
    const {addr} = useParams()
    const id = 0

    return (
        <>
            <Header/>
            <div className="container">
                <SidebarPanel/>
                <ElectionDetails
                    daoId={id}
                    daoAddr={addr}
                />
            </div>
        </>
    )
};

export default ProposalElections;
