import { KonvaEventObject } from 'konva/types/Node';
import React, { useEffect,useState } from 'react';
import { Arrow, Ellipse, Layer,Rect } from 'react-konva';

import { Tool } from './Toolbar';

interface ShapeDrawerProps {
  tool: Tool;
  addShape: (shape: any) => void;
}

export const ShapeDrawer: React.FC<ShapeDrawerProps> = ({ tool, addShape }) => {
  const [shapeProps, setShapeProps] = useState<any>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (tool === 'rectangle' || tool === 'ellipse' || tool === 'arrow') {
      setIsDrawing(true);
      const { x, y } = e.target.getStage()?.getPointerPosition()!;
      setShapeProps({ x, y, width: 0, height: 0, stroke: 'black', strokeWidth: 2 });
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing) return;
    const { x, y } = e.target.getStage()?.getPointerPosition()!;
    const newProps = {
      ...shapeProps,
      width: Math.abs(x - shapeProps.x),
      height: Math.abs(y - shapeProps.y),
      x: x < shapeProps.x ? x : shapeProps.x,
      y: y < shapeProps.y ? y : shapeProps.y,
    };
    if (tool === 'arrow') {
      newProps.points = [shapeProps.x, shapeProps.y, x, y];
    }
    setShapeProps(newProps);
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    addShape(shapeProps);
    setShapeProps(null);
  };

  useEffect(() => {
    setShapeProps(null); // Reset shape when tool changes
  }, [tool]);

  return (
    <Layer
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {shapeProps && tool === 'rectangle' && <Rect {...shapeProps} />}
      {shapeProps && tool === 'ellipse' && <Ellipse {...shapeProps} />}
      {shapeProps && tool === 'arrow' && <Arrow {...shapeProps} />}
    </Layer>
  );
};
