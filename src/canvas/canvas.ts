import { checkCanvasEntities } from '../utils';
import type { Circle, Line, PolyLine, Rect, ShapeStyleProperties } from './types';

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
        const element = document.createElement('canvas');
        element.width = width;
        element.height = height;

        parentElement.appendChild(element);

        this.entities.element = element;
        this.entities.context = this.entities.element.getContext('2d', { alpha });
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
                const { context, element } = this.entities;

                element.style.width = window.innerWidth + 'px';
                element.style.height = window.innerHeight + 'px';
                element.width = window.innerWidth * window.devicePixelRatio;
                element.height = window.innerHeight * window.devicePixelRatio;
                context?.scale(window.devicePixelRatio, window.devicePixelRatio);
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
                const { context } = this.entities;

                context.beginPath();
                context.fillStyle = backgroundColor;
                context.lineWidth = lineWidth;
                context.strokeStyle = strokeColor;
                shape();

                if (strokeColor || lineWidth) {
                    context.stroke();
                }

                context.fill();
                context.closePath();
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

    public line({ startPosition, endPosition: { x, y }, strokeColor = '', lineWidth = 0, lineDash = [] }: Line) {
        this.drawShape({ lineWidth, strokeColor }, () => {
            if (checkCanvasEntities(this.entities)) {
                const { context } = this.entities;
                context.moveTo(startPosition.x, startPosition.y);
                context.setLineDash(lineDash);
                context.lineTo(x, y);
                context.stroke();
            }
        });
    }

    public polyLine({
        lines,
        startPosition,
        lineWidth = 1,
        strokeColor = 'black',
        lineDash = [],
        backgroundColor = '',
    }: PolyLine) {
        requestAnimationFrame(() => {
            if (checkCanvasEntities(this.entities)) {
                const { context } = this.entities;
                context.beginPath();
                context.setLineDash(lineDash);
                context.fillStyle = backgroundColor;
                context.strokeStyle = strokeColor;
                context.lineWidth = lineWidth;

                context.moveTo(startPosition.x, startPosition.y);

                for (const { x, y } of lines) {
                    context.lineTo(x, y);
                }

                if (backgroundColor) {
                    context.fill();
                }

                context.stroke();
                context.closePath();
            }
        });
    }
}
