import { Canvas } from '../canvas';

const canvas = new Canvas();
canvas.create({ height: 500, width: 500 });

canvas.fillCanvas = 'papayawhip';

canvas.rect({ x: 0, y: 0, height: 40, width: 40, backgroundColor: 'salmon', strokeColor: '#ccc', lineWidth: 20 });
canvas.circle({ x: 50, y: 50, radius: 10, backgroundColor: 'gold' });
canvas.polyLine({
    lines: [
        { x: 0, y: 100 },
        { x: 80, y: 120 },
        { x: 0, y: 140 },
        { x: 80, y: 160 },
    ],
    startPosition: { x: 80, y: 80 },
    lineWidth: 10,
    strokeColor: 'tomato',
    backgroundColor: 'gold',
});

(module as any).hot.dispose(() => {
    canvas.get()?.remove();
});
