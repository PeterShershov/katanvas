import { ERRORS } from './errors';

export function checkCanvasEntities(entities: {
    element: HTMLElement | null;
    context: CanvasRenderingContext2D | null;
}): entities is { element: HTMLCanvasElement; context: CanvasRenderingContext2D } {
    if (!entities.element) {
        throw new Error(ERRORS.NO_CANVAS);
    }

    if (!(entities.element instanceof HTMLCanvasElement)) {
        throw new Error(ERRORS.WRONG_CANVAS_TYPE);
    }

    if (checkContext(entities.context)) {
        return !!entities.element && !!entities.context;
    }

    return false;
}

export function checkContext(context: CanvasRenderingContext2D | null): context is CanvasRenderingContext2D {
    if (!context) {
        throw new Error(ERRORS.NO_CONTEXT);
    }

    return !!context;
}
