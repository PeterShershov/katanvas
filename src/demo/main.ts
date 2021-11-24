import { Canvas } from '../canvas';

const canvas = new Canvas();
canvas.create({ height: 500, width: 500 });

// canvas background;
canvas.rect({ x: 0, y: 0, height: 500, width: 500, backgroundColor: 'tomato' });

// created another rect
canvas.rect({ x: 60, y: 60, height: 60, width: 60, backgroundColor: 'salmon', strokeColor: '#ccc', lineWidth: 20 });
canvas.circle({ x: 20, y: 20, radius: 10, backgroundColor: 'gold' });

module.hot.dispose(() => {
    canvas.get()?.remove();
});
