import React, { useState } from 'react';
import { Ellipse, Layer, Stage, Transformer } from 'react-konva';

const DraggableEllipse = () => {
  const [ellipseProps, setEllipseProps] = useState({
    x: 200,
    y: 150,
    radiusX: 100,
    radiusY: 50,
    rotation: 0,
  });
  const ellipseRef = React.useRef();
  const trRef = React.useRef();

  const handleDragMove = (e) => {
    const node = e.target;
    setEllipseProps((prevProps) => ({
      ...prevProps,
      x: node.x(),
      y: node.y(),
    }));
  };

  const handleTransform = () => {
    // Using transformer to adjust the size and rotation
    const node = ellipseRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // Updating ellipse size based on scaling
    const newRadiusX = Math.max(5, node.width() * scaleX / 2);
    const newRadiusY = Math.max(5, node.height() * scaleY / 2);
    const rotation = node.rotation();
    setEllipseProps((prevProps) => ({
      ...prevProps,
      rotation,
      radiusX: newRadiusX,
      radiusY: newRadiusY,
    }));
    node.scaleX(1);
    node.scaleY(1);
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Ellipse
          {...ellipseProps}
          fill='red'
          stroke='black'
          strokeWidth={4}
          draggable
          ref={ellipseRef}
          onDragMove={handleDragMove}
          onClick={() => {
            trRef.current.nodes([ellipseRef.current]);
            trRef.current.getLayer().batchDraw();
          }}
        />
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit scaling to avoid too small ellipses
            if (newBox.width < 10 || newBox.height < 10) {
              return oldBox;
            }
            return newBox;
          }}
          onTransformEnd={handleTransform}
          rotateEnabled={true}
          keepRatio={false}  // Allows the ellipse to be scaled non-uniformly
        />
      </Layer>
    </Stage>
  );
};

export default DraggableEllipse;



/***
 * 拖拽: 设置 draggable 为 true 允许椭圆在画布上自由移动。
旋转和调整大小: 使用 Transformer 组件，使椭圆可以旋转和调整大小。点击椭圆后，会显示 Transformer 控件。
颜色和样式: 椭圆的填充色设为红色，边框颜色为黑色。
 */