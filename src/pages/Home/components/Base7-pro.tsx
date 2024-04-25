import React from 'react';
import { Image, Layer, Stage } from 'react-konva';
import useImage from 'use-image';

const URLImage = ({ image, onDragEnd }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      draggable={true}
      onDragEnd={onDragEnd}
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

const App = () => {
  const dragUrl = React.useRef();
  const stageRef = React.useRef();
  const [images, setImages] = React.useState([]);

  const handleDragEnd = (index) => (event) => {
    const newImages = images.slice();
    newImages[index] = {
      ...newImages[index],
      x: event.target.x(),
      y: event.target.y(),
    };
    setImages(newImages);
  };

  return (
    <div>
      Try to drag an image into the stage:
      <br />
      <img
        alt="lion"
        src="https://konvajs.org/assets/lion.png"
        draggable="true"
        onDragStart={(e) => {
          dragUrl.current = e.target.src;
        }}
      />
      <div
        onDrop={(e) => {
          e.preventDefault();
          stageRef.current.setPointersPositions(e);
          setImages(images.concat([
            {
              ...stageRef.current.getPointerPosition(),
              src: dragUrl.current,
            },
          ]));
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ border: '1px solid grey' }}
          ref={stageRef}
        >
          <Layer>
            {images.map((image, index) => (
              <URLImage
                key={index}
                image={image}
                onDragEnd={handleDragEnd(index)}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default App;
