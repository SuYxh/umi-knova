import Konva from 'konva';
import { KonvaEventObject } from 'konva/types/Node';
import React, { useState } from 'react';
import { Text, Transformer } from 'react-konva';

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
