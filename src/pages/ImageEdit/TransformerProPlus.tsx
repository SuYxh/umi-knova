import React from 'react';
import { Ellipse, Layer, Rect, Stage, Transformer, Arrow } from 'react-konva';

const Shape = ({ shapeProps, isSelected, onSelect, onChange, shapeType }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  // const ShapeComponent = shapeType === 'rect' ? Rect : Ellipse;
  const ShapeComponent = shapeType === 'rect' ? Rect : shapeType === 'ellipse' ? Ellipse : Arrow;

  return (
    <React.Fragment>
      <ShapeComponent
        onClick={onSelect}
        onTap={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={(e) => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y(),
          });
        }}
        onTransformEnd={(e) => {
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: Math.max(5, node.width() * scaleX),
            height: Math.max(5, node.height() * scaleY),
          });
        }}
      />
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

const initialShapes = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: 'red',
    id: 'rect1',
    type: 'rect',
  },
  {
    x: 150,
    y: 150,
    radiusX: 50,
    radiusY: 25,
    stroke: 'black', // 外框颜色
    strokeWidth: 2,
    id: 'ellipse1',
    type: 'ellipse',
  },
  {
    x: 300,
    y: 100,
    width: 150,
    height: 75,
    stroke: 'blue', // 长方形框的颜色
    strokeWidth: 2,
    id: 'rect2',
    type: 'rect',
  },
  {
    points: [250, 100, 350, 200],
    pointerLength: 10,
    pointerWidth: 10,
    fill: 'black',
    stroke: 'black',
    strokeWidth: 4,
    id: 'arrow1',
    type: 'arrow'
  }
];

const TransformerComp = () => {
  const [shapes, setShapes] = React.useState(initialShapes);
  const [selectedId, selectShape] = React.useState(null);

  const checkDeselect = (e) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <div style={{ width: '600px', height: '500px', border: '1px solid black' }}>
      <Stage
        width={600}
        height={500}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
      >
        <Layer>
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

export default TransformerComp;
