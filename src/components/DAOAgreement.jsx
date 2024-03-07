import {useState, useEffect} from "react";
import {fetchDAO, getProposalDetails} from "../PosteconomyV2";
import ContractEditor from "./ContractEditor";
import "../styles/DAOAgreement.css"
import {ProposalStatus} from "../utils";

const DAOAgreement = ({addr, id}) => {
    const [data, setData] = useState({})
    const [contract_status, setContractStatus] = useState(0)

    useEffect(() => {
        const loadData = async () => {
            const details = await getProposalDetails(addr, parseInt(id))
            console.log(details)
            const {contract_code} = await fetchDAO(addr)
            setData({...details, contract_code: contract_code})
            setContractStatus(details.status_int)
        }
        loadData().catch(console.error)
    }, []);


    return (
        <div className="dao-agreement">
            <ContractEditor dao_addr={addr} contract_code={data.contract_code} read_only={contract_status !== ProposalStatus.Work_On_Contract}/>
        </div>
    )
};

export default DAOAgreement;
