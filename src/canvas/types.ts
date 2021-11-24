export interface ShapeStyleProperties {
    backgroundColor?: string | CanvasGradient | CanvasPattern;
    strokeColor?: string | CanvasGradient | CanvasPattern;
    lineWidth?: number;
}

export interface Circle extends ShapeStyleProperties {
    x: number;
    y: number;
    radius: number;
    startAngle?: number;
    endAngle?: number;
}

export interface Rect extends ShapeStyleProperties {
    width: number;
    height: number;
    x: number;
    y: number;
}

export interface Point {
    x: number;
    y: number;
}

export interface PolyLine extends ShapeStyleProperties {
    startPosition: Point;
    lines: Point[];
}
