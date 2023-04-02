import DAOitem from "./DAOitem";
import {useGlobalState} from "../store";
import "../styles/DAOlist.css";


const DAOlist = () => {
    const [daos] = useGlobalState('daos');

    return (
        <div className='dao-list'>
            {daos.map((dao, id) => <DAOitem
                key={id}
                id={id}
                addr={dao}
            />
            )}
        </div>
    )
};

export default DAOlist;
