import { FC } from 'react';
import { Layer, Text } from 'react-konva';

const TextComp: FC<any> = (props) => {
  const { textList } = props;

  return (
    <Layer>
      {textList.map((item, i) => (
        <Text
          key={i}
          text={item.text}
          x={item.x}
          y={item.y}
          draggable={item.draggable}
          fill={item.fill}
        />
      ))}
    </Layer>
  );
};

export default TextComp;
