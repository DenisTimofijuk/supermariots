export class Matrix {
    constructor() {
        this.grid = [];
    }
    forEach(callback) {
        this.grid.forEach((columns, x) => {
            columns.forEach((value, y) => {
                callback(value, x, y);
            });
        });
    }
    set(x, y, value) {
        if (!this.grid[x]) {
            this.grid[x] = [];
        }
        this.grid[x][y] = value;
    }
    get(x, y) {
        const col = this.grid[x];
        if (col) {
            return col[y];
        }
        return undefined;
    }
}
export class Vec2 {
    constructor(x, y) {
        this.set(x, y);
    }
    set(x, y) {
        this.x = x;
        this.y = y;
    }
}
//# sourceMappingURL=math.js.map