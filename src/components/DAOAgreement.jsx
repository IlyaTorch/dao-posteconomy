import {useState, useEffect} from "react";
import {fetchDAO, getProposalDetails} from "../PosteconomyV2";
import ContractEditor from "./ContractEditor";
import "../styles/DAOAgreement.css"

const DAOAgreement = ({addr, id}) => {
    const [data, setData] = useState({})

    useEffect(() => {
        const loadData = async () => {
            const details = await getProposalDetails(addr, parseInt(id))
            const {contract_code} = await fetchDAO(addr)
            setData({...details, contract_code: contract_code})
        }
        loadData().catch(console.error)
    }, []);


    return (
        <div className="dao-agreement">
            <ContractEditor dao_addr={addr} contract_code={data.contract_code}/>
        </div>
    )
};

export default DAOAgreement;
