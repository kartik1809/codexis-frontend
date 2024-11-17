import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Editor from '@monaco-editor/react';
import { setContent } from '../../../../redux/EditorContentSlice';

const CodeEditor = () => {
  const dispatch = useDispatch();
  const codeLanguage = useSelector((state) => state.language.codeLanguage);
  const code = useSelector((state) => state.editorContent.content);
  const editorRef = useRef(null);

  const onMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.focus();

    // Define the custom bluish theme with #041733 background
    monaco.editor.defineTheme('bluish-theme', {
      base: 'vs-dark', // Inherit from vs-dark theme
      inherit: true,
      rules: [
        { token: '', background: '041733' }, // Background
        { token: 'comment', foreground: '6A9FB5', fontStyle: 'italic' },
        { token: 'keyword', foreground: '527BDE' },
        { token: 'string', foreground: 'A3D9FF' },
        { token: 'variable', foreground: 'A5FF90' },
        { token: 'function', foreground: 'F1C40F' },
      ],
      colors: {
        'editor.background': '#041733', // Updated background color
        'editor.lineHighlightBackground': '#003366', // Line highlight color
        'editorCursor.foreground': '#FFD700', // Cursor color
        'editorLineNumber.foreground': '#4B6584', // Line numbers color
        'editor.selectionBackground': '#007BFF44', // Selection color
      },
    });

    // Apply the custom theme
    monaco.editor.setTheme('bluish-theme');
  };

  const handleChange = (value) => {
    dispatch(setContent(value));
  };

  return (
    <div className='code-editor'>
      <Editor
        theme='bluish-theme' // Apply the bluish theme
        onMount={onMount} // Call onMount to define and set the theme
        language={codeLanguage}
        value={code}
        onChange={handleChange}
      />
    </div>
  );
};

export default CodeEditor;
