import { useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';
import useImage from 'use-image';

const RotatingImage = () => {
  const [image] = useImage('https://qn.huat.xyz/mac/202405301124678.png', 'anonymous');
  const [rotation, setRotation] = useState(0);

  return (
    <div>
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Image
            x={window.innerWidth / 2}
            y={window.innerHeight / 2}
            offsetX={image ? image.width / 2 : 0}
            offsetY={image ? image.height / 2 : 0}
            image={image}
            rotation={rotation}
          />
        </Layer>
      </Stage>
      <input
        type="range"
        min="0"
        max="360"
        value={rotation}
        onChange={(e) => setRotation(Number(e.target.value))}
        style={{ width: 300 }}
      />
    </div>
  );
};

export default RotatingImage;
