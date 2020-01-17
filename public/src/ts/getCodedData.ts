//TODO: deletye this file at the very end of the project
/*
export default function getCodedData(entitiesCount:number) {
    const URL_KEY_IMAGE = "../fonts/pixeljihad.png";
    let URL_JSON = "";

    const password = getPassword(entitiesCount, 'koopa');
    const encryptedURLwithSJCL = window.sjcl.encrypt(password, URL_KEY_IMAGE);
    const encodedSJCLdatawithB64 = encodeURLdata(encryptedURLwithSJCL);
    URL_JSON = encodedSJCLdatawithB64;
    
    console.log("[url.json]:", URL_JSON);
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

function encodeURLdata(data:string){
    let i = 2;
    let result = btoaUTF16(data);
    while(i--){
        result = btoaUTF16(result);
    }

    return result;
}


function btoaUTF16 (sString:string) {
	const aUTF16CodeUnits = new Uint16Array(sString.length);
    Array.prototype.forEach.call(aUTF16CodeUnits, function (el, idx, arr) { arr[idx] = sString.charCodeAt(idx); });
    const uint8Ar = new Uint8Array(aUTF16CodeUnits.buffer);
	return btoa(String.fromCharCode.apply(null, uint8Ar as any));
}
*/