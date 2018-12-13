window.onload = generateDropDowns;

document.querySelector('.get-p-and-q').addEventListener('click', getPQ);
document.querySelector('.encrypt').addEventListener('click', encrypt);
document.querySelector('.decrypt').addEventListener('click', decrypt);

new ClipboardJS('.copy');

function generateDropDowns() {
  for (let i = 0; i < 1000; i++) {
    const newElem = document.createElement('option');
    newElem.value = primes[i];
    newElem.innerText = primes[i];
    document.querySelector('.p').append(newElem);
  }
  for (let i = 0; i < 1000; i++) {
    const newElem = document.createElement('option');
    newElem.value = primes[i];
    newElem.innerText = primes[i];
    document.querySelector('.q').append(newElem);
  }
}

function getPQ() {
  const p = parseInt(document.querySelector('.p').value);
  const q = parseInt(document.querySelector('.q').value);
  document.querySelector('.results').innerText = '';
  document.querySelector('.keys').innerHTML = '';
  document.querySelector('.results').innerText += `p = ${p}\n`;
  document.querySelector('.results').innerText += `q = ${q}\n`;
  getN(p, q);
}

function getN(p, q) {
  const n = p * q;
  const phiOfN = (p - 1) * (q - 1);
  document.querySelector('.results').innerText += `n = ${n}\n`;
  document.querySelector('.results').innerText += `phi(n) = ${phiOfN}\n`;
  chooseE(n, phiOfN);
}

function chooseE(n, phiOfN) {
  const possibleEs = primes.filter(prime => prime < phiOfN);
  const e = getRandomE(possibleEs, phiOfN);
  document.querySelector('.results').innerText += `e = ${e}\n`;
  let d = findD([[e, 1, 0], [phiOfN, 0, 1]]);
  if (d < 0) {
    d += phiOfN;
  }
  document.querySelector('.results').innerText += `d = ${d}\n\n`;
  document.querySelector('.keys').innerHTML += `
    <div>Public Key = 
      <span id="public-key">[${e}, ${n}]</span>
      <button class="copy" data-clipboard-target="#public-key">
        Copy Public Key
      </button>
    </div>`;
  document.querySelector('.keys').innerHTML += `
    <div>Private Key = 
      <span id="private-key">[${d}, ${n}]</span>
      <button class="copy" data-clipboard-target="#private-key">
        Copy Private Key
      </button>
    </div>`;
}

function getRandomE(arr, phiOfN) {
  let e = arr[Math.floor(Math.random() * Math.floor(arr.length))];
  if (phiOfN % e === 0) {
    e = getRandomE(arr, phiOfN);
  }
  return e;
}

function findD(matrix) {
  if (matrix[0][0] === 1) {
    d = matrix[0][1];
  } else if (matrix[1][0] === 1) {
    d = matrix[1][1];
  } else {
    const clone = [...matrix];
    const smallerFirstNum = Math.min(clone[0][0], clone[1][0]);
    const largerFirstNum = Math.max(clone[0][0], clone[1][0]);
    const rowCoeff = -1 * parseInt(largerFirstNum/smallerFirstNum);
    const smlRow = getSmallerRowIndex(clone);
    const bigRow = Math.abs(smlRow - 1);
    clone[bigRow] = clone[bigRow].map(function(num, i) {
      return num + (clone[smlRow][i] * rowCoeff);
    });
    d = findD(clone);
  }
  return d;
}

function getSmallerRowIndex(matrix) {
  if (matrix[0][0] < matrix[1][0]) {
    return 0;
  } else {
    return 1;
  }
}

function encrypt() {
  const [exp, mod] = JSON.parse(document.querySelector('#exponent').value);
  const message = document.querySelector('#message').value;
  const messageArray = message.split('');
  numberMessage = messageArray.map(function(character) {
    return characterToNumber[character];
  });
  const messagePostAlgorithm = numberMessage.map(function(num) {
    return exponentiateAndModulo(num, exp, mod);
  });
  const encryptedMessage = JSON.stringify(messagePostAlgorithm);
  document.querySelector('.encryption-result').innerText = `${encryptedMessage}`;
  document.querySelector('.encryption-copy').innerHTML = `
  <button class="copy" data-clipboard-target="#encrypted-message">
    Copy Encrypted Message
  </button>
  `;
}

function decrypt() {
  const [exp, mod] = JSON.parse(document.querySelector('#exponent-d').value);
  const encryptedMessage = document.querySelector('#message-d').value;
  const parsedMessage = JSON.parse(encryptedMessage);
  const messagePostAlgorithm = parsedMessage.map(function(num) {
    return exponentiateAndModulo(num, exp, mod);
  });
  const cipherTextArray = messagePostAlgorithm.map(function(num) {
    return numberToCharacter[num];
  });
  const cipherText = cipherTextArray.join('');
  document.querySelector('.decryption-result').innerText = `${cipherText}`;
}

function exponentiateAndModulo(num, exp, mod) {
  let result = num;
  const iterationsOfSquaring = parseInt(Math.log(exp) / Math.log(2));
  for (let i = 0; i < iterationsOfSquaring; i++) {
    result = (result ** 2) % mod;
  }
  const lastExponent = exp - (2 ** iterationsOfSquaring);
  if (lastExponent > 2) {
    result = (result * exponentiateAndModulo(num, lastExponent, mod)) % mod;
    return result;
  } else {
    result = (result * (num ** lastExponent)) % mod;
    return result;
  }
}