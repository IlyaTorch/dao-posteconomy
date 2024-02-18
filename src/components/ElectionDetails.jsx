import {fetchDAO, getDAO, getDAOproposals} from "../PosteconomyV2";
import React, {useEffect, useState} from "react";
import DAOitem from "../components/DAOitem";
import "../styles/ElectionDetails.css";
import { APIClient, Openlaw } from 'openlaw';
import OpenLawForm from 'openlaw-elements';
import 'openlaw-elements/dist/openlaw-elements.min.css';


const ElectionDetails = ({daoId, daoAddr}) => {
    const [name, setName] = useState('')
    const [contract_code, setContractCode] = useState('')
    const [execution_result, setExecutionResult] = useState(undefined)
    const [variables, setVariables] = useState([])
    const parameters = {};
    const apiClient = new APIClient('https://lib.openlaw.io/api/v1/default');
    apiClient.login('itorch2001@gmail.com', 'itorch2001');

    const onChange = (key, value) => console.log('KEY:', key, 'VALUE:', value);


    useEffect(() => {
        const loadData = async () => {
            const dao_details = await getDAO(daoAddr)
            const proposals = await getDAOproposals(daoAddr)
            const proposal_details = await fetchDAO(daoAddr)
            console.log(proposal_details)
            setContractCode(proposal_details.contract_code)
            setName(dao_details.title)
        }
        loadData().catch(console.log)
    }, [daoAddr]);

    useEffect(() => {
            const { compiledTemplate } = Openlaw.compileTemplate(contract_code);
            const { executionResult, errorMessage } = Openlaw.execute(compiledTemplate, {}, {}, {});
            if (errorMessage) {
              console.error('Openlaw Execution Error:', errorMessage);
            }
            setExecutionResult(executionResult)
            const vars = Openlaw.getExecutedVariables(executionResult, {});
            setVariables(vars)
    }, [contract_code]);


    return (
        <div className="dao-page">
            <div className="dao-page-short-info">
                <DAOitem id={daoId} addr={daoAddr} name={name}/>
            </div>
            <div className="dao-page-main">
              <div className="header">{name}</div>
                {execution_result && variables && apiClient && (
                  <OpenLawForm
                    apiClient={apiClient}
                    executionResult={execution_result}
                    parameters={parameters}
                    onChangeFunction={onChange}
                    openLaw={Openlaw}
                    variables={variables}
                  />
                )}
            </div>
        </div>
    )
};

export default ElectionDetails;
