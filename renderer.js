const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const codeInput = document.querySelector('.input-box input');
const codeButton = document.querySelector('.input-box button');
const decodeTextarea = document.querySelector('.output-box textarea');
const decodeButton = document.querySelector('.output-box button');

codeButton.addEventListener('click', () => {
    let inputVal = codeInput.value;
    const reg = /\s/gi;
    inputVal = inputVal.replace(reg, '');
    if (!inputVal) {
        codeInput.focus();
        codeInput.value = '';
        return;
    }
    const prvKey = fs.readFileSync(path.join(__dirname, 'rsa_prv.pem'), 'utf8');

    decodeTextarea.value = crypto
        .privateEncrypt(prvKey, Buffer.from(inputVal, 'utf8'))
        .toString('hex');
    if (decodeButton.innerHTML !== '复制') {
        decodeButton.innerHTML = '复制';
    }
});

decodeButton.addEventListener('click', () => {
    let copyContent = decodeTextarea.value;
    if (!copyContent) {
        return;
    }
    decodeTextarea.select();
    document.execCommand('Copy');
    decodeButton.innerHTML = '复制成功';
    decodeTextarea.value = codeInput.value = '';
});
