import {useParams} from "react-router-dom";
import Header from "../components/Header";
import DAOdetails from "../components/DAOdetails";

const DAO = () => {
    const {id} = useParams()

    return (
        <>
            <Header/>
            <br/>
            <DAOdetails daoId={id}/>
        </>
    )
};

export default DAO;
