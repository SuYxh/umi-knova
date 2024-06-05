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

  const downloadImage = () => {
    if (imageRef.current) {
      const dataURL = imageRef.current.toDataURL();
      const link = document.createElement('a');
      link.download = 'rotated-image.png';
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
        onClick={downloadImage}
        style={{ marginBottom: '10px' }}
      >
        导出图片
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
