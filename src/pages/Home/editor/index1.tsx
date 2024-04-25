import React, { useState } from 'react';
import { Image as KonvaImage,Layer, Line, Stage, Text as KonvaText } from 'react-konva';
import useImage from 'use-image';

import { ImageUploader } from './ImageUploader';
import { ShapeDrawer } from './ShapeDrawer';
import { TextInstance, TextTool } from './TextTool';
import { Tool,Toolbar } from './Toolbar';

const KonvaImageComponent = ({ src, x, y, draggable }) => {
  const [image] = useImage(src);
  return <KonvaImage image={image} x={x} y={y} draggable={draggable} />;
};

export const CanvasContainer: React.FC = () => {
  const [tool, setTool] = useState<Tool>('pen');
  const [texts, setTexts] = useState<TextInstance[]>([]);
  const [images, setImages] = useState<{ src: string; x: number; y: number }[]>([]);
  const [shapes, setShapes] = useState<Konva.ShapeConfig[]>([]);
  const [lines, setLines] = useState<Array<{ points: number[] }>>([]);
  const [drawing, setDrawing] = useState(false);

 
  const handleAddText = (textInstance: TextInstance) => {
    setTexts([...texts, textInstance]);
  };

  const handleAddImage = (src: string) => {
    setImages([...images, { src, x: 50, y: 50 }]);
  };

  const handleAddShape = (shapeProps: Konva.ShapeConfig) => {
    setShapes([...shapes, shapeProps]);
  };


  const handleMouseDown = (e) => {
    if (tool === 'pen') {
      setDrawing(true);
      const pos = e.target.getStage().getPointerPosition();
      setLines([...lines, { points: [pos.x, pos.y] }]);
    }
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    setDrawing(false);
  };

  return (
    <div>
      <Toolbar setTool={setTool} />
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {shapes.map((shape, i) => (
            <ShapeDrawer key={i} shapeProps={shape} />
          ))}
          {texts.map((text, i) => (
            <KonvaText key={i} {...text} draggable={tool === 'text'} />
          ))}
          {images.map((img, i) => (
            <KonvaImageComponent key={i} src={img.src} x={img.x} y={img.y} draggable={tool === 'text'} />
          ))}
          {lines.map((line, i) => (
            <Line key={i} points={line.points} stroke="black" strokeWidth={5} tension={0.5} lineCap="round" />
          ))}
        </Layer>
      </Stage>
      {tool === 'text' && <TextTool addText={handleAddText} />}
      <ImageUploader onImageAdd={handleAddImage} />
    </div>
  );
};

export default CanvasContainer;
