import React, { useEffect, useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';
import useImage from 'use-image';

const pic1 = 'https://qn.huat.xyz/mac/202406051057150.jpeg'

const LionImagePro = (props) => {
  const { src, stageWidth, stageHeight, ...restProps } = props;
  const [image] = useImage(src);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, x: 0, y: 0 });

  useEffect(() => {
    if (image) {
      // 计算保持宽高比的最佳尺寸
      const ratio = Math.min(stageWidth / image.width, stageHeight / image.height);
      const width = image.width * ratio;
      const height = image.height * ratio;
      const x = (stageWidth - width) / 2;  // 横向居中
      const y = (stageHeight - height) / 2;  // 纵向居中
      setDimensions({ width, height, x, y });
    }
  }, [image, stageWidth, stageHeight]);

  return <Image image={image} {...dimensions} {...restProps} />;
};

function ImageComp() {
  const stageWidth = 600;
  const stageHeight = 500;

  return (
    <div style={{ width: '600px', height: '500px', border: '1px solid black' }}>
      <Stage width={stageWidth} height={stageHeight}>
        <Layer>
          <LionImagePro src={pic1} stageWidth={stageWidth} stageHeight={stageHeight} />
        </Layer>
      </Stage>
    </div>
  );
}

export default ImageComp;
