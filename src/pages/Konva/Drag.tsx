import { useState } from 'react';
import { Layer, Stage, Text } from 'react-konva';

function DragComp() {
  const [state, setState] = useState({
    isDragging: false,
    x: 50,
    y: 50,
  });

  return (
    <div style={{ width: '600px', height: '500px', border: '1px solid black' }}>
      <Stage width={600} height={500}>
        <Layer>
          <Text
            text="Draggable Text"
            x={state.x}
            y={state.y}
            draggable
            fill={state.isDragging ? 'green' : 'black'}
            onDragStart={() => {
              setState({
                isDragging: true,
                x: 50,
                y: 50,
              });
            }}
            onDragEnd={(e) => {
              setState({
                isDragging: false,
                x: e.target.x(),
                y: e.target.y(),
              });
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default DragComp;
