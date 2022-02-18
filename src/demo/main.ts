import { Canvas } from '../canvas';

const canvas = new Canvas();
canvas.create({ height: 500, width: 500 });

canvas.fillCanvas = 'papayawhip';

canvas.rect({
    x: 130,
    y: 150,
    height: 140,
    width: 21,
    backgroundColor: 'hotpink',
    strokeColor: 'ghostwhite',
    lineWidth: 90,
});

canvas.circle({ x: 50, y: 50, radius: 10, backgroundColor: 'hotpink' });

canvas.line({
    lineDash: [22, 3],
    startPosition: { x: 300, y: 300 },
    endPosition: { x: 255, y: 55 },
    lineWidth: 12,
    strokeColor: 'hotpink',
});

canvas.line({
    lineDash: [22, 3],
    startPosition: { x: 0, y: 300 },
    endPosition: { x: 500, y: 2 },
    lineWidth: 12,
    strokeColor: 'pink',
});

canvas.polyLine({
    lineDash: [22, 31],
    lines: [
        { x: 0, y: 100 },
        { x: 100, y: 120 },
        { x: 100, y: 20 },
        { x: 410, y: 360 },
    ],
    startPosition: { x: 80, y: 80 },
    lineWidth: 10,
    strokeColor: 'hotpink',
    backgroundColor: 'pink',
});

(module as any).hot.dispose(() => {
    canvas.get()?.remove();
});
