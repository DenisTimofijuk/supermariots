import { getfinalimageurl } from "./getfinalimageurl.js";
export default class ContexMenu {
    constructor(canvas, level) {
        this.canvasID = canvas.id;
        this.div = document.createElement('div');
        this.div.className = 'custom-context-menu';
        this.div.style.display = 'none';
        this.createContextBody(canvas);
        this.update(level);
        canvas.addEventListener("contextmenu", e => this.show(e), false);
        window.addEventListener('click', e => this.hide(e), false);
        window.addEventListener("contextmenu", e => this.hide(e), false);
    }
    createContextBody(canvas) {
        const table = document.createElement('table');
        const row = createSaveImageRow(table);
        row.addEventListener('click', e => this.saveimage(e), false);
        createCopyImageRow(table);
        createEmptyRow(table);
        createInspectRow(table);
        this.div.appendChild(table);
    }
    remove() {
        if (document.body.contains(this.div)) {
            document.body.removeChild(this.div);
        }
    }
    show(event) {
        event.preventDefault();
        this.remove();
        document.body.appendChild(this.div);
        this.div.style.top = event.pageY.toString() + "px";
        this.div.style.left = event.pageX.toString() + "px";
        this.div.style.display = 'block';
    }
    hide(event) {
        if (event.type === 'click') {
            this.remove();
        }
        const eventTarget = event.target;
        if (event.type === 'contextmenu' && eventTarget && eventTarget.id !== this.canvasID) {
            this.remove();
        }
    }
    update(level) {
        this.level = level;
    }
    async saveimage(e) {
        const a = document.createElement('a');
        try {
            a.href = await getfinalimageurl(e, this.level);
            a.download = "key.jpg";
            a.click();
        }
        catch (error) {
            console.warn(error);
        }
    }
}
function createSaveImageRow(table) {
    const row = getContextRow({
        label1: 'Get a key...',
        label2: '',
        cellclassName: 'ctx-menu-table-cell',
        rowclassName: 'ctx-menu-table-row',
        colspan: 2
    });
    table.appendChild(row);
    return row;
}
function createCopyImageRow(table) {
    const row = getContextRow({
        label1: 'Copy image',
        label2: '',
        cellclassName: 'ctx-menu-table-cell',
        rowclassName: 'ctx-menu-table-row',
        colspan: 2
    });
    table.appendChild(row);
}
function createEmptyRow(table) {
    const row = getContextRow({
        label1: '',
        label2: '',
        cellclassName: 'ctx-menu-table-cell',
        rowclassName: 'ctx-menu-table-row-border',
        colspan: 2
    });
    table.appendChild(row);
}
function createInspectRow(table) {
    const row = getContextRow({
        label1: 'Inspect',
        label2: 'Ctrl+Shift+I',
        cellclassName: 'ctx-menu-table-cell',
        rowclassName: 'ctx-menu-table-row',
        colspan: 0
    });
    table.appendChild(row);
}
function getContextRow(o) {
    function _getRow(className) {
        const tr = document.createElement('tr');
        if (className !== '') {
            tr.className = className;
        }
        return tr;
    }
    function _getCell(label, className, colspan = 0) {
        const td = document.createElement('td');
        td.className = className;
        const text = document.createTextNode(label);
        td.appendChild(text);
        if (colspan > 0) {
            td.colSpan = colspan;
        }
        return td;
    }
    const tr = _getRow(o.rowclassName);
    let td = _getCell(o.label1, o.cellclassName, o.colspan);
    tr.appendChild(td);
    if (o.colspan === 0) {
        let td = _getCell(o.label2, o.cellclassName);
        tr.appendChild(td);
        td.style.textAlign = 'right';
    }
    return tr;
}
