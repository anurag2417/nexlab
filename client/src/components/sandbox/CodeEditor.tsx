import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = 'python',
}) => {
  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      language={language}
      value={value}
      onChange={(value) => onChange(value || '')}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        tabSize: 4,
        lineNumbers: 'on',
        renderWhitespace: 'selection',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        suggest: {
          showKeywords: true,
          showSnippets: true,
        },
      }}
    />
  );
};