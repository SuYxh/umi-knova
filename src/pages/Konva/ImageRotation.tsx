import { useEffect, useRef, useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';
import useImage from 'use-image';

const pic1 = 'https://qn.huat.xyz/mac/202406051057150.jpeg';

const LionImagePro = (props) => {
  const { src, stageWidth, stageHeight, rotation, ...restProps } = props;
  const [image] = useImage(src, 'anonymous');
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (image) {
      // 计算适应画布的最佳缩放比例
      const stageMin = Math.min(stageWidth, stageHeight);
      const maxImageDimension = Math.max(image.width, image.height);
      const ratio = (stageMin / maxImageDimension) * 0.8; // 给一点空间防止触碰边缘

      const width = image.width * ratio;
      const height = image.height * ratio;
      setDimensions({ width, height, x: stageWidth / 2, y: stageHeight / 2 });
    }
  }, [image, stageWidth, stageHeight]);

  return (
    <Image
      image={image}
      rotation={rotation}
      offsetX={dimensions.width / 2}
      offsetY={dimensions.height / 2}
      {...dimensions}
      {...restProps}
    />
  );
};

function ImageComp() {
  const stageWidth = 600;
  const stageHeight = 500;
  const [rotation, setRotation] = useState(0);
  const stageRef = useRef(null);

  const downloadImage = () => {
    const stage = stageRef.current;
    const dataURL = stage.toDataURL();
    const link = document.createElement('a');
    link.download = 'rotated-image.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ width: '600px', height: 'auto', border: '1px solid black' }}>
      <input
        type="range"
        min="0"
        max="360"
        value={rotation}
        onChange={(e) => setRotation(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <button type="button" onClick={downloadImage} style={{ marginBottom: '10px' }}>
        导出画布
      </button>
      <Stage ref={stageRef} width={stageWidth} height={stageHeight}>
        <Layer>
          <LionImagePro
            src={pic1}
            stageWidth={stageWidth}
            stageHeight={stageHeight}
            rotation={Number(rotation)}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default ImageComp;
