import { Matrix, MatrixValue } from "./math.js";
interface GetByIndex {
    tile: MatrixValue;
    y1: number;
    y2: number;
    x1: number;
    x2: number;
}
export default class TileResolver {
    matrix: Matrix;
    tileSize: number;
    constructor(matrix: Matrix, tileSize?: number);
    toIndex(pos: number): number;
    toIndexRange(pos1: number, pos2: number): number[];
    getByIndex(indexX: number, indexY: number): {
        tile: MatrixValue;
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    } | undefined;
    searchByPosition(posX: number, posY: number): {
        tile: MatrixValue;
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    } | undefined;
    searchByRange(x1: number, x2: number, y1: number, y2: number): GetByIndex[];
}
export {};
