import { useEffect, useRef, useState } from 'react';
import { Image, Layer, Stage } from 'react-konva';
import useImage from 'use-image';

const pic1 = 'https://qn.huat.xyz/mac/202406051057150.jpeg';

function calculateRotatedImageSize(width, height, rotationAngle) {
  const radians = (rotationAngle * Math.PI) / 180;

  // 四个角的坐标
  const corners = [
    { x: -width / 2, y: -height / 2 },
    { x: width / 2, y: -height / 2 },
    { x: width / 2, y: height / 2 },
    { x: -width / 2, y: height / 2 },
  ];

  // 旋转四个角，并找出边界
  const rotatedCorners = corners.map((corner) => ({
    x: corner.x * Math.cos(radians) - corner.y * Math.sin(radians),
    y: corner.x * Math.sin(radians) + corner.y * Math.cos(radians),
  }));

  // 计算新的边界
  const minX = Math.min(...rotatedCorners.map((corner) => corner.x));
  const maxX = Math.max(...rotatedCorners.map((corner) => corner.x));
  const minY = Math.min(...rotatedCorners.map((corner) => corner.y));
  const maxY = Math.max(...rotatedCorners.map((corner) => corner.y));

  // 新宽度和高度
  const newWidth = maxX - minX;
  const newHeight = maxY - minY;

  return { newWidth, newHeight };
}

const LionImagePro = ({
  src,
  stageWidth,
  stageHeight,
  rotation,
  setImgRef,
  onDimensionsChange,
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
      // console.log('width-->height',width, height);
      setDimensions({ width, height, x: stageWidth / 2, y: stageHeight / 2 });

      // Call the callback function with the new dimensions
      onDimensionsChange({ width, height, ratio });
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
  let rotationPic = {}

  const stageWidth = 600;
  const stageHeight = 500;
  const [rotation, setRotation] = useState(0);
  const imageRef = useRef(null);

  const setImgRef = (ref) => {
    imageRef.current = ref.current;
  };

  const handleDimensionsChange = (newDimensions) => {
    console.log('Updated dimensions:', newDimensions);
    rotationPic = newDimensions
    // setDimensions(newDimensions)
    // You can also set these to state if you want to use them for other purposes
  };

  const createDataURL = (image, originalWidth, originalHeight) => {
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
    return canvas.toDataURL();
  };

  const downloadImage = (originalSize = 1) => {
    if (imageRef.current) {
      let dataURL;
      if (originalSize === 3) {
        const image = imageRef.current.attrs.image;
        const originalWidth = image.width;
        const originalHeight = image.height;
        console.log('originalWidth', originalWidth);
        console.log('originalHeight', originalHeight);
        dataURL = createDataURL(image, originalWidth, originalHeight)
      } else if (originalSize === 2) {
        console.log('rotationPic', rotationPic, rotation);
        const image = imageRef.current.attrs.image;
        // dimensions
        const size = calculateRotatedImageSize(rotationPic.width, rotationPic.height, rotation)
        console.log('size', size);
        const newWidth = size.newWidth * ( 1 + rotationPic.ratio )
        const newHeight = size.newHeight * ( 1 + rotationPic.ratio )

        dataURL = createDataURL(image, newWidth, newHeight)
        // dataURL = imageRef.current.toDataURL();
      } else {
        dataURL = imageRef.current.toDataURL();
      }

      const imageName = {
        3: 'rotated-original-size-image.png',
        2: 'rotated-original-size-ratio.png',
        1: 'rotated-image.png',
      };

      const link = document.createElement('a');
      // @ts-ignore
      link.download = imageName[originalSize];
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
        onClick={() => downloadImage(3)}
        style={{ marginBottom: '10px' }}
      >
        导出原尺寸旋转图
      </button>
      <button
        type="button"
        onClick={() => downloadImage(2)}
        style={{ marginBottom: '10px' }}
      >
        导出原比例旋转图
      </button>
      <Stage width={stageWidth} height={stageHeight}>
        <Layer>
          <LionImagePro
            src={pic1}
            stageWidth={stageWidth}
            stageHeight={stageHeight}
            rotation={Number(rotation)}
            setImgRef={setImgRef}
            onDimensionsChange={handleDimensionsChange}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default ImageComp;
