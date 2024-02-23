import React, { useState, useEffect } from 'react';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './ContractEditor.css';
import {Openlaw} from "openlaw";
import {fetchUpdateDao} from "../PosteconomyV2";

function ContractEditor({dao_addr, contract_code}) {
    const [contract_state, setContractState] = useState(contract_code);
    const [html, setHtml] = useState('');

  useEffect(async () => {
    setContractState(contract_code)
  }, [contract_code]);


  useEffect(async () => {
    const compiled_template = await Openlaw.compileTemplate(contract_state);
    if (compiled_template.isError) {
        throw "my template error" + compiled_template.errorMessage;
    }
    const execution_result = await Openlaw.execute(compiled_template.compiledTemplate, {}, {});
    const agreements = await Openlaw.getAgreements(execution_result.executionResult);
    setHtml(await Openlaw.renderForReview(agreements[0].agreement, {}))
  }, [contract_state]);

  return (
    <div className="ContractEditor" style={{"width": 900, "height": 900}}>
        <textarea
        name="description"
        placeholder="Initiative description"
        onChange={(e) => setContractState(e.target.value)}
        value={contract_state}
        required
        />
        <br/>
        <br/>
        <div dangerouslySetInnerHTML={{__html: html}}/>
        <br/>
        <button
            className="button-save"
            onClick={async () => {await fetchUpdateDao(dao_addr, {contract_code: contract_state})}}
        >
            Save
        </button>
    </div>
  )
}

export default ContractEditor;
