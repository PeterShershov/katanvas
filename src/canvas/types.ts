export interface ShapeStyleProperties {
    backgroundColor?: string;
    strokeColor?: string;
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
