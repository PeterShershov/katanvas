import type { Circle, Rect, ShapeStyleProperties } from './types';

export class Canvas {
    private canvasElement: HTMLCanvasElement | null = null;
    private context = this.canvasElement?.getContext('2d');

    public create({
        parentElement = document.body,
        width,
        height,
    }: {
        parentElement?: HTMLElement;
        height: number;
        width: number;
    }): void {
        this.canvasElement = document.createElement('canvas');
        this.canvasElement.width = width;
        this.canvasElement.height = height;

        this.context = this.canvasElement.getContext('2d');
        parentElement.appendChild(this.canvasElement);
    }

    public clearRect() {
        if (this.canvasElement) {
            this.context!.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
        }
    }

    public get(): HTMLCanvasElement | null {
        return this.canvasElement;
    }

    public getContext(): CanvasRenderingContext2D | null {
        return this.canvasElement?.getContext('2d', { alpha: false }) || null;
    }

    public resizeToFullScreen(): void {
        requestAnimationFrame(() => {
            if (this.canvasElement) {
                this.canvasElement.style.width = window.innerWidth + 'px';
                this.canvasElement.style.height = window.innerHeight + 'px';
                this.canvasElement.width = window.innerWidth * window.devicePixelRatio;
                this.canvasElement.height = window.innerHeight * window.devicePixelRatio;
                this.context?.scale(window.devicePixelRatio, window.devicePixelRatio);
            }
        });
    }

    public clean() {
        this.canvasElement?.remove();
    }

    public drawShape({ strokeColor, backgroundColor, lineWidth }: ShapeStyleProperties, shape: () => void) {
        requestAnimationFrame(() => {
            if (this.context) {
                this.context.beginPath();
                if (backgroundColor) {
                    this.context.fillStyle = backgroundColor;
                }

                if (strokeColor && lineWidth) {
                    this.context.lineWidth = lineWidth;
                    this.context.strokeStyle = strokeColor;
                    this.context.stroke();
                }

                shape();
                this.context.fill();
                this.context.closePath();
            }
        });
    }

    public circle({
        x,
        y,
        lineWidth = 0,
        backgroundColor = '',
        strokeColor = '',
        radius,
        startAngle = 0,
        endAngle = 2 * Math.PI,
    }: Circle) {
        this.drawShape({ backgroundColor, lineWidth, strokeColor }, () =>
            this.context?.arc(x, y, radius, startAngle, endAngle)
        );
    }

    public rect({ x, y, width, height, backgroundColor = '', strokeColor = '', lineWidth = 0 }: Rect) {
        this.drawShape({ backgroundColor, lineWidth, strokeColor }, () => this.context?.rect(x, y, width, height));
    }
}
