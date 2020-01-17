const INDEX = 'koopa';
window.sjcl = window.sjcl || {};
export async function getfinalimageurl(event, level) {
    const entitiesCount = getCount(level.entities);
    const data = await getData('url');
    const password = getPassword(entitiesCount, INDEX);
    const url = window.sjcl.decrypt(password, data);
    return url;
}
async function loadJSON(url) {
    return fetch(url).then(r => r.json());
}
async function getData(name) {
    const urlJSON = await loadJSON(`../json/text/${name}.json`);
    const decoded = decodeURLdata(urlJSON.data);
    return decoded;
}
function decodeURLdata(data) {
    let i = 2;
    let result = atobUTF16(data);
    while (i--) {
        result = atobUTF16(result);
    }
    return result;
}
function atobUTF16(sBase64) {
    const sBinaryString = atob(sBase64);
    const aBinaryView = new Uint8Array(sBinaryString.length);
    Array.prototype.forEach.call(aBinaryView, function (el, idx, arr) { arr[idx] = sBinaryString.charCodeAt(idx); });
    const uint16Ar = new Uint16Array(aBinaryView.buffer);
    return String.fromCharCode.apply(null, uint16Ar);
}
function getCount(entities) {
    let count = 0;
    entities.forEach(entity => {
        count += entity.name === INDEX ? 1 : -1;
    });
    return count;
}
function getPassword(index, entityName) {
    function _getElement(str) {
        let result = '';
        let i = str.length;
        while (i--) {
            result += str.charCodeAt(i);
        }
        return result;
    }
    let password = '';
    while (index > 0) {
        password += index.toString() + _getElement(entityName);
        index--;
    }
    return password;
}
