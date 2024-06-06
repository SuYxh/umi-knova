import { useEffect, useRef, useState } from 'react';
import { Layer, Stage, Star, Text } from 'react-konva';

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    rotation: Math.random() * 180,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();

const Intro = () => {
  const [stars, setStars] = useState(INITIAL_STATE);

  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({});

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    console.log('window.innerWidth', window.innerWidth);
    console.log('window.innerHeight', window.innerHeight);
  }, []);

  const handleDragStart = (e) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      }),
    );
  };
  const handleDragEnd = (e) => {
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      }),
    );
  };
  return (
    <div ref={containerRef} style={{ width: '700px', height: '500px', border: '1px solid black' }}>
      <Stage width={dimensions.width} height={dimensions.height}>
        <Layer>
          <Text text="Try to drag a star" />
          {stars.map((star) => (
            <Star
              key={star.id}
              id={star.id}
              x={star.x}
              y={star.y}
              numPoints={5}
              innerRadius={20}
              outerRadius={40}
              fill="#89b717"
              opacity={0.8}
              draggable
              rotation={star.rotation}
              shadowColor="black"
              shadowBlur={10}
              shadowOpacity={0.6}
              shadowOffsetX={star.isDragging ? 10 : 5}
              shadowOffsetY={star.isDragging ? 10 : 5}
              scaleX={star.isDragging ? 1.2 : 1}
              scaleY={star.isDragging ? 1.2 : 1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default Intro;

// window.innerWidth 和 window.innerHeight 表示的是什么意思呢？ 我希望这个画布适配父容器我应该怎做呢？比如父容器是 800 * 500
