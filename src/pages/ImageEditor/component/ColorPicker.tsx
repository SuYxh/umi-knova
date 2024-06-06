// ColorPickerComponent.tsx

import React, { useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';

interface ColorPickerComponentProps {
    defaultColor?: string
    onColorSelected: (color: string) => void;
}

const ColorPickerComponent: React.FC<ColorPickerComponentProps> = ({ defaultColor, onColorSelected }) => {
    const [color, setColor] = useState<string>(defaultColor || '#ff483c');
    const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const handleChangeComplete = (colorResult: ColorResult) => {
        setColor(colorResult.hex);
        onColorSelected(colorResult.hex);
        handleClose();
    };

    return (
        <div>
            <div style={{
                padding: '5px',
                background: color,
                borderRadius: '2px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer'
            }} onClick={handleClick}>
                <div style={{
                    width: '36px',
                    height: '14px',
                    borderRadius: '2px',
                    background: color
                }} >
                </div>
            </div>
            {displayColorPicker ? <div style={{
                position: 'absolute',
                zIndex: '2'
            }}>
                <div style={{
                    position: 'fixed',
                    top: '0px',
                    right: '0px',
                    bottom: '0px',
                    left: '0px'
                }} onClick={handleClose} />
                <SketchPicker color={color} onChangeComplete={handleChangeComplete} />
            </div> : null}
        </div>
    );
}

export default ColorPickerComponent;
