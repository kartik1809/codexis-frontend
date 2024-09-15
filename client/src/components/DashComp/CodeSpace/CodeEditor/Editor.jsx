import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Editor from '@monaco-editor/react';
import { setContent } from '../../../../redux/EditorContentSlice';
import Output from './Output';

const CodeEditor = () => {
  const dispatch = useDispatch();
  const codeLanguage = useSelector((state) => state.language.codeLanguage);
  const code = useSelector((state) => state.editorContent.content);
  const editorRef = useRef(null);

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const handleChange = (value) => {
    dispatch(setContent(value));
  };

  return (
    <div className='code-editor'>
      <Editor
        theme='vs-dark'
        onMount={onMount}
        language={codeLanguage}
        value={code}
        onChange={handleChange}
      />
      {/* <Output edref={editorRef} lang={codeLanguage} /> */}
    </div>
  );
};

export default CodeEditor;
