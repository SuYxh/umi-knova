import { FC, useRef, useState } from 'react';
import { Layer, Stage, Line, Circle } from 'react-konva';
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

  // 画线
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [eraserEnabled, setEraserEnabled] = useState(false);
  const [eraserPosition, setEraserPosition] = useState({ x: 0, y: 0 });

  const addLine = (point) => {
    setLines([
      ...lines,
      { points: [point.x, point.y], tool: eraserEnabled ? 'eraser' : 'brush' },
    ]);
  };

  const updateLine = (point) => {
    const lastLine = lines[lines.length - 1];
    lastLine.points = [...lastLine.points, point.x, point.y];
    const newLines = lines.slice();
    newLines.splice(lines.length - 1, 1, lastLine);
    setLines(newLines);
  };

  const eraseLine = (point) => {
    // Erase lines that are close to the eraser
    const radius = 10; // radius of eraser effect
    const newLines = lines.filter((line) =>
      line.points.every((value, index) =>
        index % 2 === 0
          ? Math.hypot(value - point.x, line.points[index + 1] - point.y) >
            radius
          : true,
      ),
    );
    setLines(newLines);
  };

  const toggleEraser = () => {
    setEraserEnabled(!eraserEnabled);
  };

  const handleMouseDownLine = (e) => {
    setIsDrawing(true);
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    addLine(point);
  };

  const handleMouseMoveLine = (e) => {
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    setEraserPosition(point);

    if (isDrawing) {
      updateLine(point);
    }

    if (eraserEnabled && !isDrawing) {
      eraseLine(point);
    }
  };

  const handleMouseUpLine = () => {
    setIsDrawing(false);
  };

  // 画布监听的事件
  const handleMouseMove = (e: any) => {
    console.log('handleMouseDown', e);
    handleMouseMoveLine(e);
  };
  const handleMouseDown = (e: any) => {
    console.log('handleMouseDown', e);
    handleMouseDownLine(e);
    checkDeselect(e);
  };
  const handleMouseUp = (e: any) => {
    console.log('handleMouseUp', e);
    handleMouseUpLine();
  };
  const handleTouchStart = (e: any) => {
    console.log('handleTouchStart', e);
    checkDeselect(e);
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

      <div>
        <button type="button" onClick={toggleEraser}>
          {eraserEnabled ? 'Switch to Brush' : 'Switch to Eraser'}
        </button>
      </div>

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

        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.tool === 'eraser' ? 'white' : 'black'}
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
          {eraserEnabled && (
            <Circle
              x={eraserPosition.x}
              y={eraserPosition.y}
              radius={10}
              fill="red"
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default ImageEditor;
