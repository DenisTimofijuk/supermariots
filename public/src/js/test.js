"use strict";
if (Array.prototype && !Array.prototype.diff) {
    Array.prototype.diff = function (a) {
        return this.filter(function (i) {
            return a.indexOf(i) === -1;
        });
    };
}
if (Array.prototype && !Array.prototype.getRandom) {
    Array.prototype.getRandom = function () {
        return this[Math.floor(Math.random() * this.length)];
    };
}
//# sourceMappingURL=test.js.map