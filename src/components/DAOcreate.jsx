import {createDAO} from "../PosteconomyV2";
import {useState} from "react";
import '../styles/DAOcreate.css';


const DAOcreate = () => {
    const [daoName, setDaoName] = useState('')

    const onCreateDAO = () => {
        createDAO(daoName).then(r => console.log(r))
    }

    return (
        <div className="dao-create">
            <span className="dao-create-header">Create Your Own DAO</span>
            <input
                type="text"
                placeholder="Enter the DAO name"
                onChange={(e) => setDaoName(e.target.value)}
                value={daoName}
                required
            />
            <button
                onClick={onCreateDAO}
                className="dao-create-button"
            >
                Create DAO
            </button>
        </div>
    )
};

export default DAOcreate;
