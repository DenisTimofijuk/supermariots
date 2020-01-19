import Level from "./level.js";
import Entity from "./entity.js";
const INDEX = 'koopa';

declare global {
    interface Window { sjcl: any; }
}
window.sjcl = window.sjcl || {};
type URLJSON = {
    data:string
}

export async function getfinalimageurl(event: MouseEvent, level: Level) {
    
    const entitiesCount = getCount(level.entities);
    const data = await getData('url') as any as URLJSON;
    const password = getPassword(entitiesCount, INDEX);
    const url = window.sjcl.decrypt(password, data);

    return url;
}

async function loadJSON(url:string) {
    return fetch(url).then(r => r.json());
}

async function getData(name:string){
    const urlJSON = await loadJSON(`./json/text/${name}.json`); // ../
    const decoded = decodeURLdata(urlJSON.data);

    return decoded;
}

function decodeURLdata(data:string){
    let i = 2;
    let result = atobUTF16(data);
    while(i--){
        result = atobUTF16(result);
    }

    return result;
}

function atobUTF16 (sBase64:string) {
    const sBinaryString = atob(sBase64);
    const aBinaryView = new Uint8Array(sBinaryString.length);
    Array.prototype.forEach.call(aBinaryView, function (el, idx, arr) { arr[idx] = sBinaryString.charCodeAt(idx); });
    const uint16Ar = new Uint16Array(aBinaryView.buffer);    
    return String.fromCharCode.apply(null, uint16Ar as any);
}

function getCount(entities:Set<Entity>) {
    let count = 0;
    entities.forEach(entity => {
        count += entity.name === INDEX ? 1 : -1;
    })
    return count;
}

function getPassword(index:number, entityName:string) {
    function _getElement(str: string) {
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