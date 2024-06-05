react-konva 图片编辑器



## 需求

```
我现在想使用 react-konva 制作一个图片编辑器，我希望有一下功能。

1、可以选择一个图片支持链接或者本地选择，画布大小自适应容器，图片大小自适应画布
2、可以支持自由涂绘，改变线条颜色、大小
3、可以选择矩形、椭圆、箭头等工具进行绘制
4、支持擦除，类似于 https://konvajs.org/docs/react/Free_Drawing.html 这个中提到的擦除
5、支持自定义输入文案，写完后可以自由移动
6、可以支持其他的图片到画布中，然后图片也可以继续拖动


我想实现这些功能，我应该怎么去设计这个项目，然后应该怎么做组件封装呢？我希望你能给我提供一个最佳实践的案例或者思路。
```









## 项目设计
为了实现一个基于 `react-konva` 的图片编辑器，你需要设计一个应用，它可以处理图层、形状、文本和图像的添加、移动、编辑和删除。我将提供一个设计框架和代码示例，帮助你开始这个项目。

**项目结构**：

- **CanvasContainer**：包含画布和所有操作逻辑的主容器。
- **Toolbar**：工具栏组件，用于选择工具（画笔、橡皮擦、形状、文本、上传图片）和调整属性（颜色、线宽）。
- **ShapeDrawer**：用于绘制选定形状（矩形、椭圆、箭头）。
- **TextTool**：用于添加和编辑文本。
- **ImageUploader**：用于上传和处理图像。

### 主要组件功能
- **CanvasContainer**：管理画布状态，包括当前选择的工具、颜色、线条宽度等。
- **Toolbar**：提供按钮来切换不同的工具和编辑属性。
- **ShapeDrawer**：根据选定的形状类型，接收鼠标事件来绘制形状。
- **TextTool**：允许用户输入文本，添加到画布上，并可以拖动位置。
- **ImageUploader**：处理图像的上传和添加到画布。

### 实现步骤
1. **设置 `react-konva` 环境**：
   - 安装 `react-konva` 和 `konva`。
   - 创建一个基础的 Stage 和 Layer 结构。

2. **实现工具栏**：
   - 工具栏组件允许用户选择不同的绘图工具（自由绘画、矩形、椭圆、箭头、文本、橡皮擦）和属性（颜色、线条宽度）。

3. **自由绘画和擦除功能**：
   - 使用 Line 组件来实现自由绘画。
   - 通过改变全局合成模式来实现擦除功能，参考 `globalCompositeOperation`。

4. **形状绘制工具**：
   - 实现矩形、椭圆和箭头的绘制，允许用户在画布上点击并拖动来定义形状的大小和位置。

5. **文本工具**：
   - 使用 Text 组件来添加文本。提供一个输入框供用户输入，然后将文本添加到画布上。
   - 允许用户拖动文本进行位置调整。

6. **图像处理**：
   - 使用 Image 组件来展示图片。
   - 提供上传按钮，支持从本地选择图片或通过链接添加。
   - 图片加载后，允许在画布上拖动。

## 示例代码



### CanvasContainer 组件

```jsx
import React, { useState, useRef } from 'react';
import { Stage, Layer } from 'react-konva';
import { KonvaEventObject } from 'konva/types/Node';
import { Tool } from './Toolbar';

interface Point {
  x: number;
  y: number;
}

interface Line {
  tool: Tool;
  points: number[];
}

export const CanvasContainer: React.FC = () => {
  const [tool, setTool] = useState<Tool>('pen');
  const [lines, setLines] = useState<Line[]>([]);
  const isDrawing = useRef(false);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    isDrawing.current = true;
    const pos = e.target.getStage()?.getPointerPosition();
    if (pos) {
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing.current) return;
    const stage = e.target.getStage();
    const point = stage?.getPointerPosition();
    if (point) {
      const lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      setLines(lines.slice(0, -1).concat(lastLine));
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {/* Shapes and lines will be rendered here */}
      </Layer>
    </Stage>
  );
};

```





### Toolbar

```react
import React from 'react';

export type Tool = 'pen' | 'eraser' | 'rectangle' | 'ellipse' | 'arrow' | 'text';

interface ToolbarProps {
  setTool: (tool: Tool) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ setTool }) => {
  return (
    <div>
      <button onClick={() => setTool('pen')}>Pen</button>
      <button onClick={() => setTool('eraser')}>Eraser</button>
      <button onClick={() => setTool('rectangle')}>Rectangle</button>
      <button onClick={() => setTool('ellipse')}>Ellipse</button>
      <button onClick={() => setTool('arrow')}>Arrow</button>
      <button onClick={() => setTool('text')}>Text</button>
    </div>
  );
};

```



### **ShapeDrawer**

`ShapeDrawer` 组件需要跟踪当前正在绘制的形状，并根据用户的操作动态更新这个形状。此外，组件还需要处理形状创建完成后的状态更新。



- **状态管理**：我们使用 `shapeProps` 来存储当前正在绘制的形状的属性。`isDrawing` 用于跟踪是否正在绘制。

- 事件处理

  ：

  - `handleMouseDown`：开始绘制形状，记录起始坐标。
  - `handleMouseMove`：根据鼠标移动更新形状的大小。对于箭头，我们使用两点（起点和终点）来定义。
  - `handleMouseUp`：完成绘制并将形状添加到画布。

- **形状绘制**：根据选择的工具渲染相应的 `Rect`、`Ellipse` 或 `Arrow`。



```react
import React, { useState, useEffect } from 'react';
import { Rect, Ellipse, Arrow, Layer } from 'react-konva';
import { KonvaEventObject } from 'konva/types/Node';
import { Tool } from './Toolbar';

interface ShapeDrawerProps {
  tool: Tool;
  addShape: (shape: any) => void;
}

export const ShapeDrawer: React.FC<ShapeDrawerProps> = ({ tool, addShape }) => {
  const [shapeProps, setShapeProps] = useState<any>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (tool === 'rectangle' || tool === 'ellipse' || tool === 'arrow') {
      setIsDrawing(true);
      const { x, y } = e.target.getStage()?.getPointerPosition()!;
      setShapeProps({ x, y, width: 0, height: 0, stroke: 'black', strokeWidth: 2 });
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
    if (!isDrawing) return;
    const { x, y } = e.target.getStage()?.getPointerPosition()!;
    const newProps = {
      ...shapeProps,
      width: Math.abs(x - shapeProps.x),
      height: Math.abs(y - shapeProps.y),
      x: x < shapeProps.x ? x : shapeProps.x,
      y: y < shapeProps.y ? y : shapeProps.y,
    };
    if (tool === 'arrow') {
      newProps.points = [shapeProps.x, shapeProps.y, x, y];
    }
    setShapeProps(newProps);
  };

  const handleMouseUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    addShape(shapeProps);
    setShapeProps(null);
  };

  useEffect(() => {
    setShapeProps(null); // Reset shape when tool changes
  }, [tool]);

  return (
    <Layer
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {shapeProps && tool === 'rectangle' && <Rect {...shapeProps} />}
      {shapeProps && tool === 'ellipse' && <Ellipse {...shapeProps} />}
      {shapeProps && tool === 'arrow' && <Arrow {...shapeProps} />}
    </Layer>
  );
};

```



### TextTool

`TextTool` 组件的主要职责是接收用户输入的文本并将其渲染为可交互的文本对象。我们还需要实现一个功能来控制文本的位置和内容。



- **基本输入和按钮控制**：用户可以通过一个输入框输入文本，并通过点击按钮将其添加到画布上。
- **双击编辑**：用户可以双击画布上的任何文本，弹出一个 `textarea` 输入框，直接在画布上编辑文本内容。



```react
import React, { useState } from 'react';
import { Text, Transformer } from 'react-konva';
import Konva from 'konva';
import { KonvaEventObject } from 'konva/types/Node';

interface TextInstance {
  text: string;
  x: number;
  y: number;
  id: number;
}

interface TextToolProps {
  addText: (textInstance: TextInstance) => void;
}

export const TextTool: React.FC<TextToolProps> = ({ addText }) => {
  const [textValue, setTextValue] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const textRef = React.useRef<Konva.Text>(null);
  const trRef = React.useRef<Konva.Transformer>(null);

  const handleAddText = () => {
    if (!textValue.trim()) return;
    const textPos = { x: 50, y: 50 }; // Default position for new text
    addText({ text: textValue, ...textPos, id: Date.now() });
    setTextValue('');
    setIsEditing(false);
  };

  const handleTextDoubleClick = (e: KonvaEventObject<MouseEvent>) => {
    const node = e.target as Konva.Text;
    const stage = node.getStage()!;
    const layer = node.getLayer()!;

    // Set text editable
    const textPosition = node.absolutePosition();
    const areaPosition = {
      x: stage.container().offsetLeft + textPosition.x,
      y: stage.container().offsetTop + textPosition.y,
    };

    // Create textarea over canvas at exact position
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    textarea.value = node.text();
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x + 'px';
    textarea.style.width = node.width() - node.padding() * 2 + 'px';
    textarea.style.height = node.height() - node.padding() * 2 + 5 + 'px';
    textarea.style.fontSize = node.fontSize() + 'px';
    textarea.style.border = 'none';
    textarea.style.padding = '0px';
    textarea.style.margin = '0px';
    textarea.style.overflow = 'hidden';
    textarea.style.background = 'none';
    textarea.style.outline = 'none';
    textarea.style.resize = 'none';
    textarea.style.lineHeight = node.lineHeight().toString();
    textarea.style.fontFamily = node.fontFamily();
    textarea.style.transformOrigin = 'left top';
    textarea.style.textAlign = node.align();
    textarea.style.color = node.fill();
    textarea.focus();

    textarea.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        node.text(textarea.value);
        layer.draw();
        document.body.removeChild(textarea);
      } else if (event.key === 'Esc') {
        document.body.removeChild(textarea);
      }
    });
  };

  return (
    <div>
      {isEditing ? (
        <>
          <input
            type="text"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
          />
          <button onClick={handleAddText}>Add Text</button>
        </>
      ) : (
        <button onClick={() => setIsEditing(true)}>Add New Text</button>
      )}
    </div>
  );
};

```





### ImageUploader

`ImageUploader` 组件将包括一个输入字段用于接收图片文件或URL，以及相关逻辑来将这些图片加载到画布上。



- **图片加载**：使用 `useImage` 钩子从 `react-konva` 以支持跨域和缓存机制。
- **从本地上传图片**：使用文件输入元素接收用户选择的图片，使用 `FileReader` 将文件转换为DataURL。
- **从URL添加图片**：允许用户直接输入图片URL。
- **添加图片到画布**：通过回调函数 `onImageAdd` 将加载的图片对象传递回父组件（即 `CanvasContainer`）。



```react
import React, { useState, useCallback } from 'react';
import { Image, Layer } from 'react-konva';
import useImage from 'use-image';

interface ImageUploaderProps {
  onImageAdd: (image: HTMLImageElement) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageAdd }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [image] = useImage(imageUrl, 'Anonymous');

  const handleImageChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleImageUrlChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  }, []);

  const handleAddImageToCanvas = useCallback(() => {
    const img = new window.Image();
    img.src = imageUrl;
    img.onload = () => {
      onImageAdd(img);
    };
  }, [imageUrl, onImageAdd]);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <input type="text" placeholder="Or enter image URL" value={imageUrl} onChange={handleImageUrlChange} />
      <button onClick={handleAddImageToCanvas}>Add Image to Canvas</button>
    </div>
  );
};

```



## 集成

你刚刚帮我写了CanvasContainer、Toolbar、ShapeDrawer、TextTool、ImageUploader，请你重新在 CanvasContainer 中帮我进行一个集成，并且进行代码完善，让这个系统可以跑起来



```react
import React, { useState } from 'react';
import { Stage, Layer } from 'react-konva';
import { Toolbar, Tool } from './Toolbar';
import { ShapeDrawer } from './ShapeDrawer';
import { TextTool, TextInstance } from './TextTool';
import { ImageUploader } from './ImageUploader';
import { KonvaEventObject } from 'konva/types/Node';
import Konva from 'konva';

export const CanvasContainer: React.FC = () => {
  const [tool, setTool] = useState<Tool>('pen');
  const [texts, setTexts] = useState<TextInstance[]>([]);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [shapes, setShapes] = useState<Konva.ShapeConfig[]>([]);
  
  const handleAddText = (textInstance: TextInstance) => {
    setTexts([...texts, textInstance]);
  };

  const handleAddImage = (image: HTMLImageElement) => {
    setImages([...images, image]);
  };

  const handleAddShape = (shapeProps: Konva.ShapeConfig) => {
    setShapes([...shapes, shapeProps]);
  };

  return (
    <div>
      <Toolbar setTool={setTool} />
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {shapes.map((shape, i) => (
            <ShapeDrawer key={i} shapeProps={shape} />
          ))}
          {texts.map((text, i) => (
            <Konva.Text key={i} {...text} draggable />
          ))}
          {images.map((img, i) => (
            <Konva.Image key={i} image={img} x={50} y={50} draggable />
          ))}
        </Layer>
      </Stage>
      {tool === 'text' && <TextTool addText={handleAddText} />}
      <ImageUploader onImageAdd={handleAddImage} />
    </div>
  );
};

```



## 问题



```
同时我还希望你能实现一下  eraser 这个 擦除能力。
```



