import React from 'react'
import FileExplorer from './FileExplorer/FileExplorer'
import Editor from './CodeEditor/Editor'
const CodeSpace = (props) => {
  return (
    <div style={{display:'flex'}}>
      <FileExplorer project={props.project}/>
      <Editor/>
    </div>
  )
}

export default CodeSpace
