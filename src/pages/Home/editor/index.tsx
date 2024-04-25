import React, { useState } from 'react';
import { Image as KonvaImage,Layer, Stage, Text as KonvaText } from 'react-konva';
import useImage from 'use-image';

import { ImageUploader } from './ImageUploader';
import { ShapeDrawer } from './ShapeDrawer';
import { TextInstance, TextTool } from './TextTool';
import { Tool,Toolbar } from './Toolbar';

const KonvaImageComponent = ({ src, x, y }) => {
  const [image] = useImage(src);
  return <KonvaImage image={image} x={x} y={y} draggable />;
};

export const CanvasContainer: React.FC = () => {
  const [tool, setTool] = useState<Tool>('pen');
  const [texts, setTexts] = useState<TextInstance[]>([]);
  const [images, setImages] = useState<{ src: string; x: number; y: number }[]>([]);
  const [shapes, setShapes] = useState<Konva.ShapeConfig[]>([]);

  const handleAddText = (textInstance: TextInstance) => {
    setTexts([...texts, textInstance]);
  };

  const handleAddImage = (src: string) => {
    setImages([...images, { src, x: 50, y: 50 }]);
  };

  const handleAddShape = (shapeProps: Konva.ShapeConfig) => {
    setShapes([...shapes, shapeProps]);
  };

  return (
    <div>
      <Toolbar setTool={setTool} />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {shapes.map((shape, i) => (
            <ShapeDrawer key={i} shapeProps={shape} />
          ))}
          {texts.map((text, i) => (
            <KonvaText key={i} {...text} draggable />
          ))}
          {images.map((img, i) => (
            <KonvaImageComponent key={i} src={img.src} x={img.x} y={img.y} />
          ))}
        </Layer>
      </Stage>
      {tool === 'text' && <TextTool addText={handleAddText} />}
      <ImageUploader onImageAdd={handleAddImage} />
    </div>
  );
};

export default CanvasContainer;
