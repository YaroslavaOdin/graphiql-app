'use client'
import ReactCodeMirror from '@uiw/react-codemirror';

interface  CodemirrorProps {
  response: string
}


function Codemirror({response}:CodemirrorProps) {


  return (
    <ReactCodeMirror
    basicSetup={{
      lineNumbers: false,
    }}
    readOnly={true}
    value={response}
  />
  )
}

export default Codemirror