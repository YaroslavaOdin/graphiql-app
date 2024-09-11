import ReactCodeMirror from '@uiw/react-codemirror';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Button } from '../ui/button';

interface VariablesEditorProps {
  setVariables: Dispatch<SetStateAction<string>>;
  variables: string;
  HandleFocusOut: () => void;
}

function GraphqlVariablesEditor({ setVariables, variables, HandleFocusOut }: VariablesEditorProps) {
  const [showEditor, setShowEditor] = useState(false);

  const toggleEditor = () => setShowEditor(prev => !prev);

  return (
    <div>
      <Button variant="link" className="p-0 text-base" onClick={toggleEditor}>
        Variables:
      </Button>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          showEditor ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0'
        }`}
      >
        <ReactCodeMirror
          basicSetup={{
            lineNumbers: false,
          }}
          onChange={value => setVariables(value)}
          value={variables}
          onBlur={() => HandleFocusOut()}
        />
      </div>
    </div>
  );
}

export default GraphqlVariablesEditor;
