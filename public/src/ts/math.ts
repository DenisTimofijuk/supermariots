import { MatrixValue } from "./IAT";

export class Matrix {
    public grid: Array<Array<MatrixValue>>;

    constructor() {
        this.grid = [];
    }

    forEach(callback: (value: MatrixValue, x: number, y: number) => void): void {
        this.grid.forEach((columns, x) => {
            columns.forEach((value, y) => {
                callback(value, x, y);
            });
        })

    }

    set(x: number, y: number, value: MatrixValue): void {
        if (!this.grid[x]) {
            this.grid[x] = [];
        }

        this.grid[x][y] = value;
    }

    get(x: number, y: number): MatrixValue | undefined {
        const col = this.grid[x];
        if (col) {
            return col[y];
        }
        return undefined;
    }
}

export class Vec2 {
    public x!: number;
    public y!: number;
    constructor(x: number, y: number) {
        this.set(x, y);
    }

    set(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}
