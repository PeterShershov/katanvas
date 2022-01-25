import { checkCanvasEntities } from '../utils';
import type { Circle, PolyLine, Rect, ShapeStyleProperties } from './types';

export class Canvas {
    private entities: { element: HTMLCanvasElement | null; context: CanvasRenderingContext2D | null } = {
        element: null,
        context: null,
    };
    public create({
        parentElement = document.body,
        width,
        height,
        alpha = true,
    }: {
        parentElement?: HTMLElement;
        height: number;
        width: number;
        alpha?: boolean;
    }): void {
        this.entities.element = document.createElement('canvas');
        this.entities.context = this.entities.element.getContext('2d', { alpha });

        this.entities.element.width = width;
        this.entities.element.height = height;

        parentElement.appendChild(this.entities.element);
    }

    public clearCanvas(): void {
        if (checkCanvasEntities(this.entities)) {
            this.entities.context.clearRect(0, 0, this.entities.element.width, this.entities.element.height);
        }
    }

    public get(): HTMLCanvasElement | null {
        return this.entities.element;
    }

    public getContext(): CanvasRenderingContext2D | null {
        return this.entities.context;
    }

    public resizeToFullScreen(): void {
        requestAnimationFrame(() => {
            if (checkCanvasEntities(this.entities)) {
                this.entities.element.style.width = window.innerWidth + 'px';
                this.entities.element.style.height = window.innerHeight + 'px';
                this.entities.element.width = window.innerWidth * window.devicePixelRatio;
                this.entities.element.height = window.innerHeight * window.devicePixelRatio;
                this.entities.context?.scale(window.devicePixelRatio, window.devicePixelRatio);
            }
        });
    }

    public clean(): void {
        if (checkCanvasEntities(this.entities)) {
            this.entities.element.remove();
        }
    }

    public drawShape(
        { strokeColor = '', backgroundColor = '', lineWidth = 0 }: ShapeStyleProperties,
        shape: () => void
    ): void {
        requestAnimationFrame(() => {
            if (checkCanvasEntities(this.entities)) {
                this.entities.context.beginPath();
                this.entities.context.fillStyle = backgroundColor;
                this.entities.context.lineWidth = lineWidth;
                this.entities.context.strokeStyle = strokeColor;
                shape();

                if (strokeColor || lineWidth) {
                    this.entities.context.stroke();
                }

                this.entities.context.fill();
                this.entities.context.closePath();
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
            this.entities.context?.arc(x, y, radius, startAngle, endAngle)
        );
    }

    set fillCanvas(color: string) {
        if (!this.entities.element) {
            throw new Error('canvas element was not rendered, run create()');
        }

        this.rect({
            x: 0,
            y: 0,
            width: this.entities.element.width,
            height: this.entities.element.height,
            backgroundColor: color,
        });
    }

    public rect({ x, y, width, height, backgroundColor = '', strokeColor = '', lineWidth = 0 }: Rect): void {
        this.drawShape({ backgroundColor, lineWidth, strokeColor }, () =>
            this.entities.context!.rect(x, y, width, height)
        );
    }

    public polyLine({ lines, startPosition, lineWidth = 1, strokeColor = 'black', backgroundColor = '' }: PolyLine) {
        requestAnimationFrame(() => {
            if (checkCanvasEntities(this.entities)) {
                this.entities.context.beginPath();
                this.entities.context.fillStyle = backgroundColor;
                this.entities.context.strokeStyle = strokeColor;
                this.entities.context.lineWidth = lineWidth;

                this.entities.context.moveTo(startPosition.x, startPosition.y);

                for (const { x, y } of lines) {
                    this.entities.context.lineTo(x, y);
                }

                if (backgroundColor) {
                    this.entities.context.fill();
                }

                this.entities.context.stroke();
                this.entities.context.closePath();
            }
        });
    }
}
