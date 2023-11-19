import {useState, useEffect} from "react";
import {getProposalDetails} from "../PosteconomyV2";
import ContractEditor from "./ContractEditor";
import "../styles/DAOAgreement.css"

const DAOAgreement = ({addr, id}) => {
    const [data, setData] = useState({})

    useEffect(() => {
        const loadData = async () => {
            const details = await getProposalDetails(addr, parseInt(id))
            setData({...details})
        }
        loadData().catch(console.error)
    }, []);


    return (
        <div className="dao-agreement">
            <ContractEditor title={data.title} description={data.description}/>
        </div>
    )
};

export default DAOAgreement;
