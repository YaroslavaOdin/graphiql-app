'use client';
import ReactCodeMirror from '@uiw/react-codemirror';

interface CodemirrorProps {
  value: string;
}

function Codemirror({ value }: CodemirrorProps) {
  return (
    <ReactCodeMirror
      basicSetup={{
        lineNumbers: false,
      }}
      readOnly={true}
      value={value}
    />
  );
}

export default Codemirror;
