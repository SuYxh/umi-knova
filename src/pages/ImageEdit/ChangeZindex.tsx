import Konva from 'konva';
import React, { useState } from 'react';
import { Circle, Layer, Stage } from 'react-konva';

interface Item {
  x: number;
  y: number;
  id: string;
  color: string;
}

function generateItems(): Item[] {
  const items = [];
  for (let i = 0; i < 10; i++) {
    items.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      id: 'node-' + i,
      color: Konva.Util.getRandomColor(),
    });
  }
  return items;
}

const ChangeZindex: React.FC = () => {
  const [items, setItems] = useState<Item[]>(generateItems());

  const handleDragStart = (e: Konva.KonvaEventObject<DragEvent>) => {
    const id = e.target.name();
    const index = items.findIndex((item) => item.id === id);
    // Reorder the array by moving the dragged item to the end
    setItems((prevItems) => [
      ...prevItems.slice(0, index),
      ...prevItems.slice(index + 1),
      prevItems[index],
    ]);
  };

  const onDragEnd = (e: Konva.KonvaEventObject<DragEvent>) => {
    const id = e.target.name();
    const index = items.findIndex((item) => item.id === id);
    // Update the position of the dragged item
    const updatedItems = items.slice();
    updatedItems[index] = {
      ...items[index],
      x: e.target.x(),
      y: e.target.y(),
    };
    setItems(updatedItems);
  };

  return (
    <div style={{ width: '600px', height: 'auto', border: '1px solid black' }}>
      <Stage width={700} height={600}>
        <Layer>
          {items.map((item) => (
            <Circle
              key={item.id}
              name={item.id}
              draggable
              x={item.x}
              y={item.y}
              fill={item.color}
              radius={50}
              onDragStart={handleDragStart}
              onDragEnd={onDragEnd}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default ChangeZindex;
