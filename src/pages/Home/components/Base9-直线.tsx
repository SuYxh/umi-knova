import React from 'react';
import { Arrow,Layer, Stage } from 'react-konva';

const ArrowExample = () => {
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Arrow
          x={20}
          y={20}
          points={[0, 0, 200, 100]}
          pointerLength={10}
          pointerWidth={10}
          fill='black'
          stroke='black'
          strokeWidth={4}
        />
      </Layer>
    </Stage>
  );
};

export default ArrowExample;


/**
 * Stage: 这是所有元素的容器，你可以理解为画布的根节点。
Layer: 一个层，可以包含多个形状或其他元素。
Arrow: 一个箭头形状的组件，它有以下属性：
x 和 y: 设置箭头的起始位置（这里是相对于整个画布的）。
points: 一个数组，定义了箭头的起点和终点。这里，箭头从 (0, 0) 开始到 (200, 100) 结束。
pointerLength 和 pointerWidth: 定义箭头头部的长度和宽度。
fill 和 stroke: 设置箭头的填充色和边框色。
strokeWidth: 边框的宽度。
 */