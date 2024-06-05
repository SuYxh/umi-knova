import React, { useEffect, useRef, useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';
import useImage from 'use-image';

// the first very simple and recommended way:
const LionImage = () => {
  const [image] = useImage('https://konvajs.org/assets/lion.png');
  return <Image image={image} />;
};

const LionImagePro = (props) => {
  const { src, ...restProps } = props
  const [image] = useImage(src);
  return <Image image={image} {...restProps} />;
};

interface URLImageProps {
  src: string;
  x?: number;
  y?: number;
}

const URLImage: React.FC<URLImageProps> = ({ src, x, y }) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleLoad = () => {
    setImage(imageRef.current);
  };

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.addEventListener('load', handleLoad);

    imageRef.current = img; // 保存引用以在卸载时移除事件监听器

    return () => {
      img.removeEventListener('load', handleLoad);
    };
  }, [src]);

  return (
    <Image
      x={x}
      y={y}
      image={image}
      ref={(node) => {
        if (node) {
          // 此处可以保存 Konva 图片节点的引用，如果需要
          // 不过函数组件中通常使用 useRef
        }
      }}
    />
  );
};

function ImageComp() {
  return (
    <div style={{ border: '1px solid black' }}>
      <Stage width={700} height={500}>
        <Layer>
          <URLImage src="https://konvajs.org/assets/yoda.jpg" x={150} />
          <LionImage />
          <LionImagePro src={'https://konvajs.org/assets/yoda.jpg'} x={300} />
        </Layer>
      </Stage>
    </div>
  );
}

export default ImageComp;
