import React, { useRef, useEffect } from 'react';

interface TerminalProps {
  output: string;
}

export const Terminal: React.FC<TerminalProps> = ({ output }) => {
  const terminalRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  return (
    <pre
      ref={terminalRef}
      className="h-full overflow-auto p-4 font-mono text-sm text-gray-300"
    >
      {output || 'Ready to run your code...'}
    </pre>
  );
};