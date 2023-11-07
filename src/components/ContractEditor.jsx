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
  const [initiative_html, setInitiativeHtml] = useState(undefined);

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);

  }, [editorState]);

  function transformRangeInputs(html) {
    // Split the html into rows
    let rows = html.split('<p>');
    let transformedHtml = '';

    // Iterate over each row
    for(let i = 0; i < rows.length; i++) {
        let row = rows[i];

        // Check if the row contains the key 'range'
        if(row.includes('range:')) {
            // Extract the min, max and id/name values
            let values = row.split('range:')[1].split(';');
            let min = values[0];
            let max = values[1];
            let idAndName = values[2].split('</p>')[0];

            // Transform the row into an html input tag
            row = '<input type="range" min="' + min + '" max="' + max + '" id="' + idAndName + '" name="' + idAndName + '"></p>';
        }

        // Add the transformed row to the transformed html
        transformedHtml += '<p>' + row;
    }

    return transformedHtml;
}

function convertChoicesToSelect(html) {
    // Split the html into lines
    let lines = html.split('</p><p>');

    // Initialize the result
    let result = '';

    // Iterate over each line
    lines.forEach((line, index) => {
        // Remove the <p> and </p> tags
        line = line.replace('<p>', '').replace('</p>', '');

        // Check if the line contains 'choices:'
        if (line.includes('choices:')) {
            // Split the line into choices
            let choices = line.split('choices:')[1].split('/');

            // Start the select tag
            result += '<select>';

            // Iterate over each choice
            choices.forEach((choice, index) => {
                // Add the choice as an option
                result += `<option value="${index + 1}">${choice}</option>`;
            });

            // End the select tag
            result += '</select>';
        } else {
            // If the line does not contain 'choices:', add it as a paragraph
            result += `<p>${line}</p>`;
        }

        // If this is not the last line, add a line break
        if (index !== lines.length - 1) {
            result += '<br>';
        }
    });

    // Return the result
    return result;
}

  function createMarkup(html) {
    html = html && convertChoicesToSelect(html)
    html = html && transformRangeInputs(html)
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
      <h2>Final Initiative</h2>
      <div
        className="preview"
        dangerouslySetInnerHTML={createMarkup(convertedContent)}>
      </div>
        <button onClick={() => {window.location.href = `http://localhost:3006?description${initiative_html}`;}}>Submit</button>
    </div>
  )
}

export default ContractEditor;