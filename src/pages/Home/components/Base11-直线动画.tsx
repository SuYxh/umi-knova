import React, { useEffect,useRef } from 'react';
import { Arrow, Layer, Stage, Transformer } from 'react-konva';

const RotatingArrow = () => {
  const arrowRef = useRef();
  const trRef = useRef();
  const animRef = useRef();

  // useEffect(() => {
  //   // Animation to rotate the arrow around its center
  //   animRef.current = new Konva.Animation((frame) => {
  //     if (arrowRef.current) {
  //       const rotationSpeed = 60; // degrees per second
  //       const angleDiff = (frame.timeDiff * rotationSpeed) / 1000; // Convert time diff to angle
  //       arrowRef.current.rotate(angleDiff);
  //     }
  //   }, arrowRef.current.getLayer());

  //   animRef.current.start();

  //   return () => {
  //     animRef.current.stop();
  //   };
  // }, []);

  useEffect(() => {
    // Animation to rotate the arrow around its center
    animRef.current = new Konva.Animation((frame) => {
      if (arrowRef.current) {
        const rotationSpeed = 180; // degrees per second, increased speed
        const angleDiff = (frame.timeDiff * rotationSpeed) / 1000; // Convert time diff to angle
        arrowRef.current.rotate(angleDiff);
      }
    }, arrowRef.current.getLayer());
  
    animRef.current.start();
  
    return () => {
      animRef.current.stop();
    };
  }, []);
  

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Arrow
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          points={[0, 0, 100, 0]} // Arrow from center to right
          pointerLength={10}
          pointerWidth={10}
          fill="black"
          stroke="black"
          strokeWidth={4}
          offsetX={50} // Half of the length to rotate around the center
          draggable
          ref={arrowRef}
          onClick={() => {
            trRef.current.nodes([arrowRef.current]);
            trRef.current.getLayer().batchDraw();
          }}
        />
        <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit the transformation to prevent inversion or too small size
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
          rotateEnabled={true}
        />
      </Layer>
    </Stage>
  );
};

export default RotatingArrow;


/**
 * Animation：使用 Konva.Animation 创建一个动画，该动画会在每个动画帧更新箭头的旋转角度。动画的速度由 rotationSpeed 控制，这里设置为每秒60度。
rotate 方法：这个方法用来更新箭头的 rotation 属性，使其按指定的速度旋转。
useEffect：这个 React 钩子用于设置和清除动画，确保动画在组件装载时开始，在卸载时停止。
offsetX：通过设置 offsetX 为箭头长度的一半，箭头会围绕其中点旋转。
这样，当你加载这个组件时，箭头将自动开始围绕其中点顺时针旋转。点击箭头会显示 Transformer 控件，允许进行位置调整和缩放操作。
 */