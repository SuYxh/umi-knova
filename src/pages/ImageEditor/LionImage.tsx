import { FC, useEffect, useRef, useState } from 'react';
import { Image } from 'react-konva';
import useImage from 'use-image';

const LionImage: FC<any> = ({
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

export default LionImage;
