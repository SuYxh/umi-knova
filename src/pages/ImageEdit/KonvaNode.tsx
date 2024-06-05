import React from 'react';
import { Circle, Layer, Stage, Text } from 'react-konva';

const pulseShape = (shape) => {
  // use Konva methods to animate a shape
  shape.to({
    scaleX: 1.5,
    scaleY: 1.5,
    onFinish: () => {
      shape.to({
        scaleX: 1,
        scaleY: 1,
      });
    },
  });
};

const KonvaNodeComp = () => {
  const circleRef = React.useRef(null);

  const handleStageClick = () => {
    // this event demonstrates how to access Konva node using ref
    const shape = circleRef.current;
    pulseShape(shape);
  };

  const handleCircleClick = (e) => {
    // another way to access Konva nodes is to just use event object
    const shape = e.target;
    pulseShape(shape);
    // prevent click on stage
    e.cancelBubble = true;
  };

  return (
    <div style={{ width: '600px', height: '500px', border: '1px solid black' }}>
      <Stage
        width={600}
        height={500}
        onClick={handleStageClick}
        onTap={handleStageClick}
      >
        <Layer>
          <Text text="Click on any place to see an animation" />
          <Circle
            ref={circleRef}
            x={600 / 2}
            y={500 / 2}
            radius={80}
            fill="green"
            onClick={handleCircleClick}
            onTap={handleCircleClick}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default KonvaNodeComp;
