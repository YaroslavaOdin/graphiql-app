'use client';
import ReactCodeMirror from '@uiw/react-codemirror';

interface JSONViewerProps {
  value: string;
  statusCode: number | undefined;
}

function JSONViewer({ value, statusCode }: JSONViewerProps) {
  return (
    <div>
      {statusCode && (
        <p>
          <i>{`Status code: ${statusCode}`}</i>
        </p>
      )}
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
