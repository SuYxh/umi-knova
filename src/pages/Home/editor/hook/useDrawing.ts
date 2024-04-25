import { KonvaEventObject } from 'konva/types/Node';
import { useCallback,useState } from 'react';

interface Line {
    points: number[];
}

// Custom hook for handling free drawing on a canvas using Konva
export const useDrawing = (enabled: boolean) => {
    const [lines, setLines] = useState<Line[]>([]);
    const [drawing, setDrawing] = useState(false);

    const handleMouseDown = useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (!enabled) return;
        setDrawing(true);
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { points: [pos.x, pos.y] }]);
    }, [enabled, lines]);

    const handleMouseMove = useCallback((e: KonvaEventObject<MouseEvent>) => {
        if (!drawing || !enabled) return;
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    }, [drawing, enabled, lines]);

    const handleMouseUp = useCallback(() => {
        setDrawing(false);
    }, []);

    return {
        lines,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp
    };
};
