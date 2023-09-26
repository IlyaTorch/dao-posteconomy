import React, { useState, useEffect } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './ContractEditor.css';

function ContractEditor({title, description}) {
  const [editorState, setEditorState] = useState(
    () => EditorState.createWithText(`# ${title} \n${description}\n\n`),
  );
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);

  }, [editorState]);


  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }

  return (
    <div className="ContractEditor" style={{"width": 900, "height": 900}}>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
        toolbar={{
          options: ['inline', 'blockType']
        }}
        hashtag={{
          separator: ' ',
          trigger: '#',
        }}
        mention={{
          separator: ' ',
          trigger: '@',
          suggestions: [
            { text: 'Alex Pavlov', value: 'alexpavlov', url: 'alexpavlov' },
            { text: 'Anton Glad', value: 'antonglad', url: 'antonglad' },
          ],
        }}
      />
      <br/>
      <h1 className="font-semibold text-3xl mb-5">Final Initiative</h1>
      <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}>
      </div>
    </div>
  )
}

export default ContractEditor;