interface Array<T> {
    diff(a: Array<any>): Array<any>;
    getRandom():any;
}

if (Array.prototype && !Array.prototype.diff) {
    Array.prototype.diff = function (a: Array<any>): Array<any> {
        return this.filter(function (i: number) {
            return a.indexOf(i) === -1;
        });
    };
}

if (Array.prototype && !Array.prototype.getRandom) {
    Array.prototype.getRandom = function (): any {
        return this[Math.floor(Math.random()*this.length)];
    };
}