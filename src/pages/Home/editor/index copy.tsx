import React, { useState } from 'react';
import { Image as KonvaImage,Layer, Line, Stage, Text as KonvaText } from 'react-konva';
import useImage from 'use-image';

import { useDrawing } from './hook/useDrawing';  // 确保引入了自定义的绘图 Hook
import { ImageUploader } from './ImageUploader';
import { ShapeDrawer } from './ShapeDrawer';
import { TextInstance, TextTool } from './TextTool';
import { Tool,Toolbar } from './Toolbar';

export const CanvasContainer: React.FC = () => {
    const [tool, setTool] = useState<Tool>('pen');
    const [texts, setTexts] = useState<TextInstance[]>([]);
    const [images, setImages] = useState<{ src: string; x: number; y: number }[]>([]);
    const [shapes, setShapes] = useState<Konva.ShapeConfig[]>([]);

    const drawingEnabled = tool === 'pen';  // 启用绘图功能仅当选择了“pen”工具
    const { lines, handleMouseDown, handleMouseMove, handleMouseUp } = useDrawing(drawingEnabled);

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
                    {images.map((img, i) => {
                        const [image] = useImage(img.src);
                        return <KonvaImage key={i} image={image} x={img.x} y={img.y} draggable={tool === 'text'} />;
                    })}
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
