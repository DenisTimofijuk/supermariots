import { Matrix, MatrixValue } from "./math.js";

interface GetByIndex {
    tile: MatrixValue;
    y1: number;
    y2: number;
    x1: number;
    x2: number;
}

export default class TileResolver {
    public matrix: Matrix;
    public tileSize: number;

    constructor(matrix: Matrix, tileSize = 16) {
        this.matrix = matrix;
        this.tileSize = tileSize;
    }

    toIndex(pos: number) {
        return Math.floor(pos / this.tileSize);
    }

    toIndexRange(pos1: number, pos2: number) {
        const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
        const range = [];
        let pos = pos1;
        do {
            range.push(this.toIndex(pos));
            pos += this.tileSize;
        } while (pos < pMax);

        return range;
    }

    getByIndex(indexX: number, indexY: number) {
        const tile = this.matrix.get(indexX, indexY);
        if (tile) {
            const x1 = indexX * this.tileSize;
            const x2 = x1 + this.tileSize;
            const y1 = indexY * this.tileSize;
            const y2 = y1 + this.tileSize;
            return {
                tile,
                x1,
                x2,
                y1,
                y2
            }
        }
    }

    searchByPosition(posX: number, posY: number) {
        return this.getByIndex(
            this.toIndex(posX),
            this.toIndex(posY)
        );
    }

    searchByRange(x1:number, x2:number, y1:number, y2:number){
        const matches:Array<GetByIndex> = [];
        this.toIndexRange(x1, x2).forEach(indexX => {
            this.toIndexRange(y1, y2).forEach(indexY => {
                const match = this.getByIndex(indexX, indexY);
                if(match){
                    matches.push(match);
                }
            })
        })

        return matches;
    }
}