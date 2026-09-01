import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

export const CodeEditor = ({ 
  value, 
  onChange, 
  language = 'python',
  readOnly = false,
  theme = 'vs-dark',
  height = '100%',
}) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Configure Python language features
    monaco.languages.registerCompletionItemProvider('python', {
      provideCompletionItems: () => {
        const suggestions = [
          { label: 'print', kind: monaco.languages.CompletionItemKind.Function, insertText: 'print(${1:message})' },
          { label: 'def', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'def ${1:function_name}(${2:params}):\n    ${3:pass}' },
          { label: 'class', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'class ${1:ClassName}:\n    def __init__(self):\n        ${2:pass}' },
          { label: 'if', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'if ${1:condition}:\n    ${2:pass}' },
          { label: 'for', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'for ${1:item} in ${2:iterable}:\n    ${3:pass}' },
          { label: 'while', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'while ${1:condition}:\n    ${2:pass}' },
          { label: 'import', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'import ${1:module}' },
          { label: 'from', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'from ${1:module} import ${2:something}' },
          { label: 'try', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'try:\n    ${1:pass}\nexcept ${2:Exception} as e:\n    ${3:pass}' },
          { label: 'with', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'with ${1:context} as ${2:var}:\n    ${3:pass}' },
          { label: 'lambda', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'lambda ${1:x}: ${2:x * 2}' },
          { label: 'return', kind: monaco.languages.CompletionItemKind.Keyword, insertText: 'return ${1:value}' },
        ];
        return { suggestions };
      }
    });

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      const runButton = document.querySelector('[data-run-button]');
      if (runButton) runButton.click();
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      const saveButton = document.querySelector('[data-save-button]');
      if (saveButton) saveButton.click();
    });
  };

  const handleChange = (value) => {
    onChange(value);
  };

  return (
    <Editor
      height={height}
      defaultLanguage={language}
      language={language}
      value={value}
      onChange={handleChange}
      onMount={handleEditorDidMount}
      theme={theme}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        tabSize: 4,
        lineNumbers: 'on',
        renderWhitespace: 'selection',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        wordWrap: 'on',
        wrappingIndent: 'indent',
        suggest: {
          showKeywords: true,
          showSnippets: true,
          showFunctions: true,
          showClasses: true,
        },
        readOnly: readOnly,
        lineHeight: 1.6,
        fontFamily: 'JetBrains Mono, monospace',
        bracketPairColorization: { enabled: true },
        linkedEditing: true,
        formatOnPaste: true,
        formatOnType: true,
      }}
    />
  );
};

export default CodeEditor;