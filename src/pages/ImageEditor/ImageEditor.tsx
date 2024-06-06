import { FC, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import LionImage from './LionImage';
import Shape from './Shape';
import { initialShapes } from './initialValue';

const ImageEditor: FC<any> = (props) => {
  const { stageWidth, stageHeight, src } = props;
  const imageRef = useRef(null);
  const stageRef = useRef(null);

  // 图片旋转
  const [rotation, setRotation] = useState(0);

  // 形状相关，矩形、箭头
  const [shapes, setShapes] = useState(initialShapes);
  const [selectedId, selectShape] = useState(null);

  const setImgRef = (ref) => {
    imageRef.current = ref;
  };

  const downloadImage = () => {
    if (imageRef.current && stageRef.current) {
      const imageNode = imageRef.current;
      const scaleX = imageNode.scaleX();
      const scaleY = imageNode.scaleY();

      const imageWidth = imageNode.width() * scaleX;
      const imageHeight = imageNode.height() * scaleY;
      const imageX = imageNode.x() - imageWidth / 2;
      const imageY = imageNode.y() - imageHeight / 2;

      const dataURL = stageRef.current.toDataURL({
        x: imageX,
        y: imageY,
        width: imageWidth,
        height: imageHeight,
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = 'cropped-image.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  // 画布监听的事件
  const handleMouseMove = (e: any) => {
    console.log('handleMouseDown', e);
  };
  const handleMouseDown = (e: any) => {
    console.log('handleMouseDown', e);
    checkDeselect(e)
  };
  const handleMouseUp = (e: any) => {
    console.log('handleMouseUp', e);
  };
  const handleTouchStart = (e: any) => {
    console.log('handleTouchStart', e);
    checkDeselect(e)
  };

  return (
    <div
      style={{
        width: stageWidth + 'px',
        height: 'auto',
        border: '1px solid black',
      }}
    >
      <div>
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
          导出图片
        </button>
      </div>

      <div></div>

      <Stage
        ref={stageRef}
        width={stageWidth}
        height={stageHeight}
        onMousemove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseup={handleMouseUp}
        onTouchStart={handleTouchStart}
      >
        <Layer>
          {/* 图片 */}
          <LionImage
            src={src}
            stageWidth={stageWidth}
            stageHeight={stageHeight}
            rotation={rotation}
            setImgRef={setImgRef}
          />

          {/* 矩形、椭圆、箭头 */}
          {shapes.map((shape, i) => {
            return (
              <Shape
                key={i}
                shapeProps={shape}
                isSelected={shape.id === selectedId}
                onSelect={() => {
                  selectShape(shape.id);
                }}
                onChange={(newAttrs) => {
                  const updatedShapes = shapes.slice();
                  updatedShapes[i] = newAttrs;
                  setShapes(updatedShapes);
                }}
                shapeType={shape.type}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default ImageEditor;
