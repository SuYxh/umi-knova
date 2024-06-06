import { useState } from 'react';

function useDrawLines() {
  // 画线
  const [lines, setLines] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [eraserEnabled, setEraserEnabled] = useState(false);
  const [eraserPosition, setEraserPosition] = useState({ x: 0, y: 0 });

  // 定义一个状态变量，初始值为 false（未选中）
  const [isSelectPen, setIsSelectPen] = useState(false);

  // 定义一个处理 checkbox 点击的函数
  const handleCheckboxChange = (event) => {

    const flag = event.target.checked

    if (!flag) {
      setEraserEnabled(false)
    }

    // 更新状态为当前 checkbox 的选中状态
    setIsSelectPen(flag);
  };

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
    if (!isSelectPen) {
      return
    }

    setIsDrawing(true);
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    addLine(point);
  };

  const handleMouseMoveLine = (e) => {
    if (!isSelectPen) {
      return
    }

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

  return {
    lines,
    isDrawing,
    eraserEnabled,
    eraserPosition,
    isSelectPen,
    toggleEraser,
    handleCheckboxChange,
    handleMouseMoveLine,
    handleMouseDownLine,
    handleMouseUpLine
  }
}

export default useDrawLines