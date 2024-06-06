import { useEffect, useRef, useState } from 'react';
import { Circle,Image, Layer, Stage } from 'react-konva';
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
    setImgRef(imageRef.current);
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
  const layerRef = useRef(null);

  const setImgRef = (ref) => {
    imageRef.current = ref;
  };

  const downloadImage = () => {
    if (imageRef.current && layerRef.current) {
      const imageNode = imageRef.current;
      const scaleX = imageNode.scaleX();
      const scaleY = imageNode.scaleY();

      const imageWidth = imageNode.width() * scaleX;
      const imageHeight = imageNode.height() * scaleY;
      const imageX = imageNode.x() - imageWidth / 2;
      const imageY = imageNode.y() - imageHeight / 2;

      const dataURL = layerRef.current.toDataURL({
        x: imageX,
        y: imageY,
        width: imageWidth,
        height: imageHeight,
        pixelRatio: 2
      });

      const link = document.createElement('a');
      link.download = 'cropped-image.png';
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
        onChange={(e) => setRotation(Number(e.target.value))}
        style={{ marginBottom: '10px' }}
      />
      <button
        type="button"
        onClick={downloadImage}
        style={{ marginBottom: '10px' }}
      >
        导出带圆形的图片
      </button>
      <Stage width={stageWidth} height={stageHeight}>
        <Layer ref={layerRef}>
          <LionImagePro
            src={pic1}
            stageWidth={stageWidth}
            stageHeight={stageHeight}
            rotation={rotation}
            setImgRef={setImgRef}
          />
          <Circle
            x={stageWidth / 2}
            y={stageHeight / 2}
            radius={50}
            fill="red"
            stroke="black"
            strokeWidth={4}
          />
        </Layer>
      </Stage>
    </div>
  );
}

export default ImageComp;
