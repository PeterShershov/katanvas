import type { Circle, PolyLine, Rect, ShapeStyleProperties } from './types';

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

    public clearRect(): void {
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

    public clean(): void {
        this.canvasElement?.remove();
    }

    public drawShape(
        { strokeColor = '', backgroundColor = '', lineWidth = 0 }: ShapeStyleProperties,
        shape: () => void
    ): void {
        requestAnimationFrame(() => {
            if (this.context) {
                this.context.beginPath();
                this.context.fillStyle = backgroundColor;
                this.context.lineWidth = lineWidth;
                this.context.strokeStyle = strokeColor;

                if (strokeColor && lineWidth) {
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
    }: Circle): void {
        this.drawShape({ backgroundColor, lineWidth, strokeColor }, () =>
            this.context?.arc(x, y, radius, startAngle, endAngle)
        );
    }

    public rect({ x, y, width, height, backgroundColor = '', strokeColor = '', lineWidth = 0 }: Rect): void {
        this.drawShape({ backgroundColor, lineWidth, strokeColor }, () => this.context?.rect(x, y, width, height));
    }

    public polyLine({ lines, startPosition, lineWidth = 1, strokeColor = 'black', backgroundColor = '' }: PolyLine) {
        requestAnimationFrame(() => {
            if (this.context) {
                this.context.beginPath();
                this.context.fillStyle = backgroundColor;
                this.context.strokeStyle = strokeColor;
                this.context.lineWidth = lineWidth;

                this.context.moveTo(startPosition.x, startPosition.y);

                for (const { x, y } of lines) {
                    this.context.lineTo(x, y);
                }

                this.context.stroke();
                this.context.fill();
                this.context.closePath();
            }
        });
    }
}
