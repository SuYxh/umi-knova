import React, { useState } from 'react';
import { Arrow, Layer, Stage, Transformer } from 'react-konva';

const DraggableArrow = () => {
  const [arrowProps, setArrowProps] = useState({
    x: 100,
    y: 100,
    points: [0, 0, 200, 100],
    rotation: 0,
  });
  const arrowRef = React.useRef();
  const trRef = React.useRef();

  const handleDragMove = (e) => {
    const node = e.target;
    setArrowProps((prevProps) => ({
      ...prevProps,
      x: node.x(),
      y: node.y(),
    }));
  };

  const handleTransform = () => {
    // Transformer is used to change the rotation and scale
    const node = arrowRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // Updating arrow points based on scaling and rotation
    const newWidth = Math.max(5, node.width() * scaleX);
    const rotation = node.rotation();
    setArrowProps((prevProps) => ({
      ...prevProps,
      rotation,
      points: [0, 0, newWidth, 0], // Updating length based on the width of transformer
    }));
    node.scaleX(1);
    node.scaleY(1);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Arrow
          {...arrowProps}
          ref={arrowRef}
          fill='black'
          stroke='black'
          strokeWidth={4}
          draggable
          onDragMove={handleDragMove}
          onClick={() => {
            trRef.current.nodes([arrowRef.current]);
            trRef.current.getLayer().batchDraw();
          }}
        />
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit the scale to avoid too small or inverted arrows
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
          onTransformEnd={handleTransform}
          rotateEnabled={true}
        />
      </Layer>
    </Stage>
  );
};

export default DraggableArrow;



/**
 * 拖拽: 通过设置 draggable 属性为 true，可以让箭头在画布上自由移动。
旋转: 使用 Transformer 组件可以旋转箭头。用户点击箭头后，Transformer 将显示旋转控制点。
长度调整: 同样使用 Transformer，通过调整箭头的宽度来改变箭头长度。这里需要特别注意，长度变化是通过调整 points 属性来实现的。
 */