import { MatrixValue } from "./IAT";
export declare class Matrix {
    grid: Array<Array<MatrixValue>>;
    constructor();
    forEach(callback: (value: MatrixValue, x: number, y: number) => void): void;
    set(x: number, y: number, value: MatrixValue): void;
    get(x: number, y: number): MatrixValue | undefined;
}
export declare class Vec2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
    set(x: number, y: number): void;
}
