import { useEffect, useRef, useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';
import useImage from 'use-image';

const pic1 = 'https://qn.huat.xyz/mac/202406051057150.jpeg';

const LionImagePro = ({
  src,
  stageWidth,
  stageHeight,
  rotation,
  setImgRef,
  ...restProps
}) => {
  const [image] = useImage(src, 'anonymous');
  const imageRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  useEffect(() => {
    if (image) {
      const stageMin = Math.min(stageWidth, stageHeight);
      const maxImageDimension = Math.max(image.width, image.height);
      const ratio = (stageMin / maxImageDimension) * 0.8;

      const width = image.width * ratio;
      const height = image.height * ratio;
      setDimensions({ width, height, x: stageWidth / 2, y: stageHeight / 2 });
    }
    setImgRef(imageRef);
  }, [image, stageWidth, stageHeight, setImgRef]);

  return (
    <Image
      ref={imageRef}
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
  const imageRef = useRef(null);

  const setImgRef = (ref) => {
    imageRef.current = ref.current;
  };

  const downloadImage = (originalSize = false) => {
    if (imageRef.current) {
      let dataURL;
      if (originalSize) {
        const image = imageRef.current.attrs.image;
        const originalWidth = image.width;
        const originalHeight = image.height;

        // 创建离屏 canvas
        const canvas = document.createElement('canvas');
        canvas.width = originalWidth;
        canvas.height = originalHeight;
        const ctx = canvas.getContext('2d');

        // 将 canvas 原点移动到中心，以便旋转
        ctx.translate(originalWidth / 2, originalHeight / 2);
        ctx.rotate((rotation * Math.PI) / 180);

        // 绘制图片，将图片中心对准原点
        ctx.drawImage(image, -originalWidth / 2, -originalHeight / 2);

        dataURL = canvas.toDataURL();
      } else {
        dataURL = imageRef.current.toDataURL();
      }

      const link = document.createElement('a');
      link.download = originalSize
        ? 'rotated-original-size-image.png'
        : 'rotated-image.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
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
      <button
        type="button"
        onClick={() => downloadImage()}
        style={{ marginBottom: '10px' }}
      >
        导出图片
      </button>
      <button
        type="button"
        onClick={() => downloadImage(true)}
        style={{ marginBottom: '10px' }}
      >
        导出原尺寸旋转图
      </button>
      <Stage width={stageWidth} height={stageHeight}>
        <Layer>
          <LionImagePro
            src={pic1}
            stageWidth={stageWidth}
            stageHeight={stageHeight}
            rotation={Number(rotation)}
            setImgRef={setImgRef}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default ImageComp;
