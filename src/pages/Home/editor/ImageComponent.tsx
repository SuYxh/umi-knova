import React from 'react';
import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

interface KonvaImageComponentProps {
    src: string;
    x: number;
    y: number;
    draggable: boolean;
}

const KonvaImageComponent: React.FC<KonvaImageComponentProps> = ({ src, x, y, draggable }) => {
    const [image] = useImage(src);
    return <KonvaImage image={image} x={x} y={y} draggable={draggable} />;
};

export default KonvaImageComponent;
