import React from 'react'
import FileExplorer from './FileExplorer/FileExplorer'
import Editor from './CodeEditor/Editor'
const CodeSpace = () => {
  return (
    <div style={{display:'flex'}}>
      <FileExplorer/>
      <Editor/>
    </div>
  )
}

export default CodeSpace
