var p, q, n;
var newElem;
 
window.onload = generateDropDowns;

document.querySelector('.get-p-and-q').addEventListener('click', getPQ);
document.querySelector('.encrypt').addEventListener('click', encrypt);
document.querySelector('.decrypt').addEventListener('click', decrypt);

function generateDropDowns() {
  for (var i = 0; i < 1000; i++) {
    newElem = document.createElement('option');
    newElem.value = primes[i];
    newElem.innerText = primes[i];
    document.querySelector('.p').append(newElem);
  }
  for (var i = 0; i < 1000; i++) {
    newElem = document.createElement('option');
    newElem.value = primes[i];
    newElem.innerText = primes[i];
    document.querySelector('.q').append(newElem);
  }
}

function getPQ() {
  p = parseInt(document.querySelector('.p').value);
  q = parseInt(document.querySelector('.q').value);
  document.querySelector('.results').innerText = '';
  document.querySelector('.results').innerText += `p = ${p}\n`;
  document.querySelector('.results').innerText += `q = ${q}\n`;
  getN(p, q);
}

function getN(p, q) {
  n = p * q;
  var phiOfN = (p - 1) * (q - 1);
  document.querySelector('.results').innerText += `n = ${n}\n`;
  document.querySelector('.results').innerText += `phi(n) = ${phiOfN}\n`;
  chooseE(phiOfN);
}

function chooseE(phiOfN) {
  var possibleEs = primes.filter(prime => prime < phiOfN);
  let e = getRandomE(possibleEs, phiOfN);
  document.querySelector('.results').innerText += `e = ${e}\n`;
  let d = findD([[e, 1, 0], [phiOfN, 0, 1]]);
  if (d < 0) {
    d += phiOfN;
  }
  document.querySelector('.results').innerText += `d = ${d}\n\n`;
  document.querySelector('.results').innerText += `Public Key = (${e}, ${n})\n`;
  document.querySelector('.results').innerText += `Private Key = (${d}, ${n})\n`;
}

function getRandomE(arr, phiOfN) {
  let e = arr[Math.floor(Math.random() * Math.floor(arr.length))];
  if (phiOfN % e === 0) {
    e = getRandomE(arr, phiOfN);
  }
  return e;
}

function findD(inMatrix) {
  let matrix = inMatrix;
  if (matrix[0][0] === 1) {
    d = matrix[0][1];
  } else if (matrix[1][0] === 1) {
    d = matrix[1][1];
  } else {
    let clone = [...matrix];
    let smallerFirstNum = Math.min(clone[0][0], clone[1][0]);
    let largerFirstNum = Math.max(clone[0][0], clone[1][0]);
    let rowCoeff = -1 * parseInt(largerFirstNum/smallerFirstNum);
    let smlRow = getSmallerRowIndex(clone);
    let bigRow = Math.abs(smlRow - 1);
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
  let exp = parseInt(document.querySelector('#exponent').value);
  let mod = parseInt(document.querySelector('#modulus').value);
  let message = document.querySelector('#message').value;
  let messageArray = message.toLowerCase().split('');
  numberMessage = messageArray.map(function(char) {
    return convertCharacterToNumber(char);
  });
  let messagePostAlgorithm = numberMessage.map(function(num) {
    return exponentiateAndModulo(num, exp, mod);
  });
  let encryptedMessage = JSON.stringify(messagePostAlgorithm);
  document.querySelector('.encryption-result').innerText = `${encryptedMessage}`;
}

function decrypt() {
  let encryptedMessage = document.querySelector('#message-d').value;
  let parsedMessage = JSON.parse(encryptedMessage);
  let exp = parseInt(document.querySelector('#exponent-d').value);
  let mod = parseInt(document.querySelector('#modulus-d').value);
  let messagePostAlgorithm = parsedMessage.map(function(num) {
    return exponentiateAndModulo(num, exp, mod);
  });
  let cipherTextArray = messagePostAlgorithm.map(function(num) {
    return convertNumberToCharacter(num);
  });
  let cipherText = cipherTextArray.join('');
  document.querySelector('.decryption-result').innerText = `${cipherText}`;
}

function exponentiateAndModulo(num, exp, mod) {
  let result = num;
  let iterationsOfSquaring = parseInt(Math.log(exp) / Math.log(2));
  for (var i = 0; i < iterationsOfSquaring; i++) {
    result = (result ** 2) % mod;
  }
  let lastExponent = exp - (2 ** iterationsOfSquaring);
  if (lastExponent > 2) {
    result = (result * exponentiateAndModulo(num, lastExponent, mod)) % mod;
    return result;
  } else {
    result = (result * (num ** lastExponent)) % mod;
    return result;
  }
}

function convertCharacterToNumber(character) {
  return characterToNumber[character];
}

function convertNumberToCharacter(num) {
  return numberToCharacter[num];
}