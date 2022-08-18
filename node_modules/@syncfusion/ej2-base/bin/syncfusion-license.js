#! /usr/bin/env node
"use strict";
var fs = global.fs = global.fs || require('fs');
const args = process.argv.slice(2);
const envKey = process.env.SYNCFUSION_LICENSE;
if (args == 'activate') {
    var licKey = '';
    if (fs.existsSync('./syncfusion-license.txt')) {
        licKey = fs.readFileSync('./syncfusion-license.txt', 'UTF8');
    } else if (envKey) {
        licKey = envKey;
    }
    if (licKey != '') {
        var licKeySplit = licKey.split(';');
        var pkey = [5439488, 7929856, 5111808, 6488064, 4587520, 7667712, 5439488,
            6881280, 5177344, 7208960, 4194304, 4456448, 6619136, 7733248, 5242880, 7077888,
            6356992, 7602176, 4587520, 7274496, 7471104, 7143424];
        var decryptedStr = [];
        var resultArray = [];
        for (var i = 0; i < licKeySplit.length; i++) {
            var lKey = licKeySplit[i];
            var decodeStr = getDecryptedData(lKey);
            if (!decodeStr) {
                continue;
            }
            var k = 0;
            var buffr = '';
            for (var i = 0; i < decodeStr.length; i++, k++) {
                if (k === pkey.length) {
                    k = 0;
                }
                var c = decodeStr.charCodeAt(i);
                buffr += String.fromCharCode(c ^ (pkey[k] >> 16));
            }
            decryptedStr = buffr.split(';');
            // checked the length to verify the key in proper structure
            if (decryptedStr.length > 3) {
                resultArray.push({
                    currentPlatform: decryptedStr[0],
                    version: decryptedStr[1],
                    expiryDate: decryptedStr[2]
                });
                var licData = resultArray[0].currentPlatform + ';' + resultArray[0].version + ';' + resultArray[0].expiryDate + ';';
                var encryptedKey = getEncryptedKey(licData);
                var jsFiles = ['./node_modules/@syncfusion/ej2-base/src/validate-lic.js', './node_modules/@syncfusion/ej2-base/dist/es6/ej2-base.es2015.js', './node_modules/@syncfusion/ej2-base/dist/es6/ej2-base.es5.js', './node_modules/@syncfusion/ej2-base/dist/ej2-base.umd.min.js'];
                for (var n = 0; n < jsFiles.length; n++) {
                    if (fs.existsSync(jsFiles[n])) {
                        var content = fs.readFileSync(jsFiles[n], "UTF8");
                        content = content.replace(/npxKeyReplace[^"]*/, 'npxKeyReplace' + encryptedKey);
                        fs.writeFileSync(jsFiles[n], content);
                    }
                }
                console.log('(INFO) Syncfusion License imported successfully.');
            } else {
                console.log('(Error) License key is not valid.');
            }
        }
    } else {
        console.log('Please add the syncfusion-license.txt file or set environment variable SYNCFUSION_LICENSE');
    }
} else {
    console.log('Supported command: npx syncfusion-license activate');
}

function getEncryptedKey(uniKey) {
    var resKey = '';
    var uniVal = [];
    var alpVal = [];
    var encString = new Array();
    for (var i = 0; i < uniKey.length; i++) {
        uniVal[i] = uniKey[i].charCodeAt(0);
    }
    for (var j = 0, m = 65; j < 26; j++, m++) {
        alpVal[j] = String.fromCharCode(m);
    }
    var pos = Math.floor(Math.random() * ((alpVal.length - 1) - 0 + 1) + 0);
    var uniAlpVal = alpVal[pos].charCodeAt(0);
    for (var i = 0; i < uniKey.length; i++) {
        encString[i] = parseInt(uniVal[i]) + parseInt(alpVal[pos].charCodeAt(0));
    }
    encString[uniVal.length] = uniAlpVal;
    for (var i = 0; i < encString.length; i++) {
        resKey += String.fromCharCode(encString[i]);
    }
    return Buffer.from(resKey, 'ascii').toString('base64');
}

function getDecryptedData(key) {
    try {
        return Buffer.from(key, 'base64').toString('binary');
    }
    catch (error) {
        return '';
    }
};

process.exit(0);