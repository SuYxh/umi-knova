import { FC } from 'react';
import { Circle, Layer, Line } from 'react-konva';

const DrawLines: FC<any> = (props) => {
  const { lines, eraserEnabled, eraserPosition } = props;

  return (
    <Layer>
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
  );
};

export default DrawLines;
