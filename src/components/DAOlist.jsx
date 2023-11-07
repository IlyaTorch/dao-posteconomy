import DAOitem from "./DAOitem";
import {useGlobalState} from "../store";
import "../styles/DAOlist.css";


const DAOlist = () => {
    let daos = useGlobalState('filtered_daos')[0];
    daos = daos.map(d => d.dao_addr)
    daos = [...daos, ...daos, ...daos, ...daos, ...daos, ...daos]
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
