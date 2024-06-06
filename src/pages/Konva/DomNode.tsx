import { Layer, Rect, Stage } from 'react-konva';
import { Html } from 'react-konva-utils';

function DomNode() {
  return (
    <div style={{ width: '600px', height: '500px', border: '1px solid black' }}>
      <Stage width={600} height={500}>
        <Layer>
          <Html
            divProps={{
              style: {
                position: 'absolute',
                top: 10,
                left: 10,
              },
            }}
          >
            <input placeholder="DOM input from Konva nodes" />
          </Html>
          <Rect
            x={20}
            y={20}
            width={50}
            height={50}
            fill="red"
            shadowBlur={5}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default DomNode;
