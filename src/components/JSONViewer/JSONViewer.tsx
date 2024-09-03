'use client';
import ReactCodeMirror from '@uiw/react-codemirror';

interface CodemirrorProps {
  value: string;
  statusCode: number | undefined;
}

function JSONViewer({ value, statusCode }: CodemirrorProps) {
  return (
    <div>
    {statusCode && <p>
      <i>{`Status code: ${statusCode}\n`}</i>
    </p>}
    <ReactCodeMirror
      basicSetup={{
        lineNumbers: false,
      }}
      readOnly={true}
      value={value}
    />
  </div>
  );
}

export default JSONViewer;
