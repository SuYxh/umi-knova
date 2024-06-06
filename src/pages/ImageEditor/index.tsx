import { FC } from 'react';

import ImageEditor from './ImageEditor';

const ImageEditComp: FC = () => {
  const pic1 = 'https://qn.huat.xyz/mac/202406051057150.jpeg';
  const width = 700;
  const height = 500;

  return (
    <div>
      <ImageEditor stageWidth={width} stageHeight={height} src={pic1} />
    </div>
  );
};

export default ImageEditComp;
