// import * as Keychain from 'react-native-keychain';
var CryptoJS = require('crypto-js');

const encKey = '';
class TravisAes {
  constructor() {
    this._keySize = 256;
    this._ivSize = 128;
    this._iterationCount = 1989;
  }

  generateKey(salt, passPhrase) {
    return CryptoJS.PBKDF2(passPhrase, CryptoJS.enc.Hex.parse(salt), {
      keySize: this._keySize / 32,
      iterations: this._iterationCount,
    });
  }

  encryptWithIvSalt(salt, iv, passPhrase, plainText) {
    let key = this.generateKey(salt, passPhrase);
    let encrypted = CryptoJS.AES.encrypt(plainText, key, {
      iv: CryptoJS.enc.Hex.parse(iv),
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }

  decryptWithIvSalt(salt, iv, passPhrase, cipherText) {
    let key = this.generateKey(salt, passPhrase);
    let cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(cipherText),
    });
    let decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
      iv: CryptoJS.enc.Hex.parse(iv),
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  encrypt(plainText, key) {
    let iv = CryptoJS.lib.WordArray.random(this._ivSize / 8).toString(
      CryptoJS.enc.Hex,
    );
    let salt = CryptoJS.lib.WordArray.random(this._keySize / 8).toString(
      CryptoJS.enc.Hex,
    );
    let cipherText = this.encryptWithIvSalt(salt, iv, key, plainText);
    return salt + iv + cipherText;
  }

  decrypt(cipherText, passPhrase = encKey) {
    let ivLength = this._ivSize / 4;
    let saltLength = this._keySize / 4;
    let salt = cipherText.substr(0, saltLength);
    let iv = cipherText.substr(saltLength, ivLength);
    let encrypted = cipherText.substring(ivLength + saltLength);
    let decrypted = this.decryptWithIvSalt(salt, iv, passPhrase, encrypted);
    return decrypted;
  }

  get keySize() {
    return this._keySize;
  }

  set keySize(value) {
    this._keySize = value;
  }

  get iterationCount() {
    return this._iterationCount;
  }

  set iterationCount(value) {
    this._iterationCount = value;
  }
}

export const saveKey = async key => {
  // await Keychain.setInternetCredentials('key', 'key', key);
};

export const getKey = async () => {
  // try {
  //   const key = await Keychain.getInternetCredentials('key');
  //   if (key) {
  //     var words = CryptoJS.enc.Base64.parse(key.password);
  //     var textString = CryptoJS.enc.Utf8.stringify(words);
  //     return textString;
  //   } else {
  //     return '';
  //   }
  // } catch (e) {
  //   return 'error';
  // }
};

export const decryptUrl = (encVal) => {
  //Creating the Vector Key
  var iv = CryptoJS.enc.Hex.parse('f223c454b2481db42540f68b96fb585b');
  //Encoding the Password in from UTF8 to byte array
  var Pass = CryptoJS.enc.Utf8.parse('zUgbGd7M8ETYRgxM');
  //Encoding the Salt in from UTF8 to byte array
  var Salt = CryptoJS.enc.Utf8.parse("7p4xrVNvWp8Nyc8hE3k6pXUfLr84wxXu");
  //Creating the key in PBKDF2 format to be used during the decryption
  var key128Bits1000Iterations = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, { keySize: 128 / 32, iterations: 1000 });
  //Enclosing the test to be decrypted in a CipherParams object as supported by the CryptoJS libarary
  var cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(encVal)
  });

  //Decrypting the string contained in cipherParams using the PBKDF2 key
  var decrypted = CryptoJS.AES.decrypt(cipherParams, key128Bits1000Iterations, { mode: CryptoJS.mode.CBC, iv: iv, padding: CryptoJS.pad.Pkcs7 });
  var data = decrypted.toString(CryptoJS.enc.Utf8);
  return data;
}


export const decodekey = async key => {
  var words = CryptoJS.enc.Base64.parse(key);
  console.log(words, '--words')
  var textString = CryptoJS.enc.Utf8.stringify(words);
  console.log(textString, '--tex')
  return textString;
};

export const encrypt = (plainText, key) => {
  let iv = CryptoJS.lib.WordArray.random(this._ivSize / 8).toString(
    CryptoJS.enc.Hex,
  );
  let salt = CryptoJS.lib.WordArray.random(this._keySize / 8).toString(
    CryptoJS.enc.Hex,
  );
  let cipherText = this.encryptWithIvSalt(salt, iv, key, plainText);
  return salt + iv + cipherText;
};

export default TravisAes;
