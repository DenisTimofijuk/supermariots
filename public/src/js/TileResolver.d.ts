import { Matrix } from "./math.js";
import { GetByIndex } from "./IAT.js";
export default class TileResolver {
    matrix: Matrix;
    tileSize: number;
    constructor(matrix: Matrix, tileSize?: number);
    toIndex(pos: number): number;
    toIndexRange(pos1: number, pos2: number): number[];
    getByIndex(indexX: number, indexY: number): {
        tile: import("./IAT.js").MatrixValue;
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    } | undefined;
    searchByPosition(posX: number, posY: number): {
        tile: import("./IAT.js").MatrixValue;
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    } | undefined;
    searchByRange(x1: number, x2: number, y1: number, y2: number): GetByIndex[];
}
