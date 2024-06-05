import React, { useState } from 'react';
import { Stage, Layer, Line, Circle } from 'react-konva';

const Canvas = () => {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [eraserEnabled, setEraserEnabled] = useState(false);
  const [eraserPosition, setEraserPosition] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const pos = e.target.getStage().getPointerPosition();
    if (eraserEnabled) {
      // Start a new eraser path
      setLines([...lines, { points: [pos.x, pos.y], tool: 'eraser' }]);
    } else {
      // Start a new brush path
      setLines([...lines, { points: [pos.x, pos.y], tool: 'brush' }]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing && !eraserEnabled) return;
    
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (eraserEnabled) {
      setEraserPosition(point);
    }

    if (isDrawing) {
      const lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      const newLines = lines.slice();
      newLines.splice(lines.length - 1, 1, lastLine);
      setLines(newLines);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const toggleEraser = () => {
    setEraserEnabled(!eraserEnabled);
  };

  return (
    <div>
      <button onClick={toggleEraser}>
        {eraserEnabled ? 'Switch to Brush' : 'Switch to Eraser'}
      </button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.tool === 'eraser' ? 'white' : 'black'}
              strokeWidth={line.tool === 'eraser' ? 20 : 5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
          {eraserEnabled && (
            <Circle
              x={eraserPosition.x}
              y={eraserPosition.y}
              radius={10}
              fill="red"
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
