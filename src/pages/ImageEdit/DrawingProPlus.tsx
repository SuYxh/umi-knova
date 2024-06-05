import React, { useState } from 'react';
import { Stage, Layer, Line, Image, Circle } from 'react-konva';
import useImage from 'use-image';

const Canvas = () => {
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [eraserEnabled, setEraserEnabled] = useState(false);
  const [eraserPosition, setEraserPosition] = useState({ x: 0, y: 0 });
  const [image] = useImage('https://qn.huat.xyz/mac/202406051057150.jpeg', 'Anonymous');

  const handleMouseDown = (e) => {
    setIsDrawing(true);
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    addLine(point);
  };

  const handleMouseMove = (e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setEraserPosition(point);

    if (isDrawing) {
      updateLine(point);
    }

    if (eraserEnabled && !isDrawing) {
      eraseLine(point);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const addLine = (point) => {
    setLines([...lines, { points: [point.x, point.y], tool: eraserEnabled ? 'eraser' : 'brush' }]);
  };

  const updateLine = (point) => {
    const lastLine = lines[lines.length - 1];
    lastLine.points = [...lastLine.points, point.x, point.y];
    const newLines = lines.slice();
    newLines.splice(lines.length - 1, 1, lastLine);
    setLines(newLines);
  };

  const eraseLine = (point) => {
    // Erase lines that are close to the eraser
    const radius = 10; // radius of eraser effect
    const newLines = lines.filter(line => 
      line.points.every((value, index) => 
        index % 2 === 0 ?
        Math.hypot(value - point.x, line.points[index + 1] - point.y) > radius :
        true
      )
    );
    setLines(newLines);
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
          {image && <Image image={image} />}
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.tool === 'eraser' ? 'white' : 'black'}
              strokeWidth={5}
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
