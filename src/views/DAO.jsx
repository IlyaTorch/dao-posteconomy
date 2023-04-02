import {useParams} from "react-router-dom";
import Header from "../components/Header";
import DAOdetails from "../components/DAOdetails";
import {useGlobalState} from "../store";


const DAO = () => {
    const {addr} = useParams()
    const [daos] = useGlobalState('daos');
    const id = daos.indexOf(addr)

    return (
        <>
            <Header/>
            <br/>
            <DAOdetails
                daoId={id}
                daoAddr={addr}
            />
        </>
    )
};

export default DAO;
