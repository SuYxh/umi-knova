`react-konva` 是一个用于绘制 2D 图形的 React 组件库，它封装了 Konva 框架的功能，使得在 React 应用中使用 canvas 变得更加便捷。`react-konva` 提供了一系列组件，可以用来绘制和管理各种图形和交互。下面是一些主要的 `react-konva` 组件：

1. **基础形状**：
   - `Rect`：用于绘制矩形。
   - `Circle`：用于绘制圆形。
   - `Ellipse`：用于绘制椭圆形。
   - `Line`：用于绘制线条（包括折线和多边形）。
   - `Arrow`：用于绘制带箭头的线条。
   - `Polygon`：用于绘制多边形。
   - `Star`：用于绘制星形。
   - `Ring`：用于绘制环形。
   - `Wedge`：用于绘制楔形。

2. **复杂形状**：
   - `Path`：用于通过 SVG 路径数据绘制复杂形状。
   - `Text`：用于绘制文本。
   - `TextPath`：用于将文本沿路径绘制。
   - `Image`：用于在画布上显示图片。
   - `Sprite`：用于绘制精灵图（spritesheet）。

3. **容器**：
   - `Layer`：层容器，用于组织形状。
   - `Group`：组容器，可以包含多个形状，形状可以作为一个单元进行变换。

4. **效果和滤镜**：
   - `Transformer`：一个特殊的容器组件，用于变换（如旋转、缩放）所包含的形状。
   - 支持的滤镜效果包括模糊、亮度、对比度等，可以应用于图像和其他形状。

5. **高级用法**：
   - `FastLayer`：一个优化的层，用于静态内容，不支持事件处理，渲染性能更高。
   - `Canvas`：用于更底层的 canvas 绘图操作。

这些组件允许你在 React 应用中创建复杂和动态的图形界面，支持广泛的交互和动画功能。通过组合使用这些组件，你可以构建出复杂的2D图形应用，如游戏、图形编辑器、数据可视化等。