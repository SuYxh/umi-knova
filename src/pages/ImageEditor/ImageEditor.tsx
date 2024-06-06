import { FC, useEffect, useRef, useState } from 'react';
import { Layer, Stage } from 'react-konva';
import ColorPicker from './component/ColorPicker';
import DrawLines from './component/DrawLines';
import LionImage from './component/LionImage';
import Shape from './component/Shape';
import useDrawLines from './hooks/useDrawLines';
import { initialShapes } from './initialValue';
import style from './style.less';

const ImageEditor: FC<any> = (props) => {
  const { stageWidth, stageHeight, src } = props;
  const imageRef = useRef(null);
  const stageRef = useRef(null);

  // 图片旋转
  const [rotation, setRotation] = useState(0);
  const [lineSize, setLineSize] = useState(5);

  // 形状相关，矩形、箭头
  const [shapes, setShapes] = useState(initialShapes);
  const [selectedId, selectShape] = useState(null);

  useEffect(() => {
    console.log('selectedId change', selectedId);
  }, [selectedId])

    // 画线
    const {
      lines,
      eraserEnabled,
      eraserPosition,
      isSelectPen,
      toggleEraser,
      handleCheckboxChange,
      handleMouseDownLine,
      handleMouseMoveLine,
      handleMouseUpLine,
    } = useDrawLines();

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

  const onColorSelected = (color: any) => {
    console.log('onColorSelected', color);

    const newShapes = shapes.find( item => item.id === selectedId) ?? {}
    if (!newShapes.type) {
      return
    }

    switch (newShapes.type) {
      // 矩形
      case 'rect':
        newShapes.stroke = color
        break;
      // 椭圆
      case 'ellipse':
        newShapes.stroke = color
        break;
        
       // 箭头
      case 'arrow':
        newShapes.stroke = color
        newShapes.fill = color
      break; 
    
      default:
        break;
    }

    setShapes([...shapes, newShapes])
  };

  const deleteShape = () => {
    console.log('当前选中的图形', selectedId);
    const newShapes = shapes.filter( item => item.id !== selectedId)
    setShapes(newShapes)
  }

  const addShape = (type: 'rect' | 'ellipse' | 'arrow') => {
    let newShape: any = {}
    const timestamp = new Date().getTime();
    switch (type) {
      // 矩形
      case 'rect':
        newShape = {
          x: 300,
          y: 100,
          width: 150,
          height: 75,
          stroke: 'blue',
          strokeWidth: 2,
          id: `rect-${timestamp}`,
          type: 'rect',
        }
        break;
      // 椭圆
      case 'ellipse':
        newShape = {
          x: 150,
          y: 150,
          radiusX: 50,
          radiusY: 25,
          stroke: 'black',
          strokeWidth: 2,
          id: `ellipse-${timestamp}`,
          type: 'ellipse',
        }
        break;
        
       // 箭头
      case 'arrow':
        newShape = {
          points: [250, 100, 350, 200],
          pointerLength: 10,
          pointerWidth: 10,
          fill: 'black',
          stroke: 'black',
          strokeWidth: 4,
          id: `arrow-${timestamp}`,
          type: 'arrow',
        }
      break; 
    
      default:
        break;
    }
    setShapes([...shapes, newShape])
  }

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

  useEffect(() => {
    // 定义处理键盘事件的函数
    const handleKeyDown = (event) => {
      if (event.key === 'Backspace') {
        console.log('退格键被按下了');
        // 这里可以添加你想要执行的代码
        deleteShape()
      }
    };

    // 添加键盘事件监听器
    document.addEventListener('keydown', handleKeyDown);

    // 组件卸载时移除监听器
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedId]);

  return (
    <div
      style={{
        width: stageWidth + 'px',
        height: 'auto',
        border: '1px solid black',
      }}
    >
      <div className={style['operation-area']}>
        {/* 图片旋转 */}

        <div className={style['operation-image']}>
          <span>图片旋转:</span>
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
            style={{ marginLeft: '10px' }}
          >
            导出图片
          </button>
        </div>

        <div className={style['operation-pen']}>
          <label>
            <input
              type="checkbox"
              checked={isSelectPen} // 绑定 checkbox 的选中状态
              onChange={handleCheckboxChange} // 设置改变事件处理器
            />
            开始绘画
          </label>
          <button
            type="button"
            onClick={toggleEraser}
            style={{ marginLeft: '10px' }}
          >
            {eraserEnabled ? 'Switch to Brush' : 'Switch to Eraser'}
          </button>
        </div>

        <div className={style['operation-line']}>
          <span>线条粗细:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={lineSize}
            onChange={(e) => setLineSize(Number(e.target.value))}
            style={{ marginBottom: '10px' }}
          />
        </div>

        <div className={style['operation-color']}>
          <span>选择颜色:</span>
          <ColorPicker onColorSelected={onColorSelected} />
        </div>

        <div className={style['operation-btn']}>
          <button type="button" onClick={() => addShape('rect')}>添加矩形</button>
          <button type="button" onClick={() => addShape('ellipse')}>添加椭圆</button>
          <button type="button" onClick={() => addShape('arrow')}>添加箭头</button>
        </div>
      </div>

      {/* TODO:  handleMouseDown 增加截流处理 */}
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
                  console.log('Shape-onSelect', shape.id);
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

        {/* 画线 */}
        <DrawLines
          lines={lines}
          eraserEnabled={eraserEnabled}
          eraserPosition={eraserPosition}
        />
      </Stage>
    </div>
  );
};

export default ImageEditor;
