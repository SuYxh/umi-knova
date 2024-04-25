import React from 'react';

export type Tool = 'pen' | 'eraser' | 'rectangle' | 'ellipse' | 'arrow' | 'text';

interface ToolbarProps {
  setTool: (tool: Tool) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ setTool }) => {
  return (
    <div>
      <button onClick={() => setTool('pen')}>Pen</button>
      <button onClick={() => setTool('eraser')}>Eraser</button>
      <button onClick={() => setTool('rectangle')}>Rectangle</button>
      <button onClick={() => setTool('ellipse')}>Ellipse</button>
      <button onClick={() => setTool('arrow')}>Arrow</button>
      <button onClick={() => setTool('text')}>Text</button>
    </div>
  );
};
