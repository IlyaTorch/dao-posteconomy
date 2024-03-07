import {fetchDAO, getDAO, getDAOproposals, setProposalState} from "../PosteconomyV2";
import React, {useEffect, useState} from "react";
import DAOitem from "../components/DAOitem";
import "../styles/ElectionDetails.css";
import {APIClient, Openlaw} from 'openlaw';
import OpenLawForm from 'openlaw-elements';
import 'openlaw-elements/dist/openlaw-elements.min.css';
import {ProposalStatus} from "../utils";


const ElectionDetails = ({daoId, daoAddr}) => {
    const [name, setName] = useState('')
    const [contract_code, setContractCode] = useState('')
    const [execution_result, setExecutionResult] = useState(undefined)
    const [variables, setVariables] = useState([])
    const [parameters, setParameters] = useState({})
    const [html, setHtml] = useState('')
    const [can_send, setCanSend] = useState(false)

    const apiClient = new APIClient('https://lib.openlaw.io/api/v1/default');

    const onChange = (key, value) => {
        const params = {}
        params[key] = value
        setParameters({...parameters, ...params})
    }

    const onSend = async () => {
        const templ = await apiClient.getTemplate('initiative-dao');
        const params = {
          // templateId: templ.id,
          title: templ.title,
          text: templ.content,
          creator: "41968753-71d5-48d2-be13-48476331ad49", // id from openlaw
          parameters: parameters,
          agreements: {},
          instanceId: null,
          readonlyEmails: ['itorch2001@gmail.com', 'itorch2001+4@gmail.com'],
          editEmails: ['itorch2001+1@gmail.com', 'itorch2001+3@gmail.com'],
        };

        const contract_id = await apiClient.uploadContract(params)

        await apiClient.sendContract(
          ["itorch2001@gmail.com", "itorch2001+5@gmail.com"],
          ["itorch2001+3@gmail.com"],
          contract_id
        )
        await setProposalState(daoAddr, 0, ProposalStatus.WIP)
    }


    useEffect(() => {
        const loadData = async () => {
            const dao_details = await getDAO(daoAddr)
            const proposals = await getDAOproposals(daoAddr)
            const proposal_details = await fetchDAO(daoAddr)
            setContractCode(proposal_details.contract_code)
            setName(dao_details.title)
            await apiClient.login('itorch2001@gmail.com', 'itorch2001')
            if (proposals[0].status_int === ProposalStatus.Work_On_Contract) {setCanSend(true)}
        }
        loadData().catch(console.log)
    }, [daoAddr]);

    useEffect(() => {
            const { compiledTemplate } = Openlaw.compileTemplate(contract_code);
            const { executionResult, errorMessage } = Openlaw.execute(compiledTemplate, {}, parameters);
            if (errorMessage) {
              console.error('Openlaw Execution Error:', errorMessage);
            }
            setExecutionResult(executionResult)
            const vars = Openlaw.getExecutedVariables(executionResult, {});
            setVariables(vars)
    }, [contract_code]);

    useEffect(async () => {
            const { compiledTemplate } = Openlaw.compileTemplate(contract_code);
            const { executionResult, errorMessage } = Openlaw.execute(compiledTemplate, {}, parameters);
            if (errorMessage) {
              console.error('Openlaw Execution Error:', errorMessage);
            }
            setExecutionResult(executionResult)
            const vars = Openlaw.getExecutedVariables(executionResult, {});
            setVariables(vars)
            const agreements = await Openlaw.getAgreements(executionResult);
            setHtml(await Openlaw.renderForReview(agreements[0].agreement, {}))
    }, [parameters]);


    return (
        <div className="dao-page">
            <div className="dao-page-short-info">
                <DAOitem id={daoId} addr={daoAddr} name={name}/>
            </div>
            <div className="dao-page-main">
                {can_send && <>
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
                    <div dangerouslySetInnerHTML={{__html: html}}/>
                    <button className="button-send" onClick={onSend} disabled={!can_send}>Send</button>
                </>}
                {!can_send && <h1>Contract has already been send to developers</h1>}
            </div>
        </div>
    )
};

export default ElectionDetails;
