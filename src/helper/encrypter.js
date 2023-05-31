var CryptoJS = require('crypto-js'),
  crypto = require('crypto');

var key_data = '##base64##',
  iv_data = '##base64##',
  defaultIterations = 10000,
  defaultKeyLength = 64;

var key = CryptoJS.enc.Base64.parse('#base64Key#'),
  iv = CryptoJS.enc.Base64.parse('#base64IV#');

module.exports = {
  _encrypt: function (data) {
    var cipherid, encrypted;
    cipherid = CryptoJS.AES.encrypt(JSON.stringify(data), key_data, { iv: iv_data }).toString();
    encrypted = encodeURIComponent(cipherid);
    return encrypted;
  },

  _decrypt: function (data) {
    var decoURL, bytes;
    decoURL = decodeURIComponent(data);
    bytes = CryptoJS.AES.decrypt(decoURL, key_data, { iv: iv_data }).toString(CryptoJS.enc.Utf8);
    return bytes;
  },

  encrypt_data: (param) => {
    var cipher = CryptoJS.AES.encrypt(param, key, { iv: iv }).toString();
    return cipher;
  },

  decrypt_data: (param) => {
    var decipher = CryptoJS.AES.decrypt(param, key, { iv: iv }).toString(CryptoJS.enc.Utf8);
    return decipher;
  },

  base_encrypt: (data) => {
    var buff = new Buffer(data);
    var enc_data = buff.toString('base64');
    return enc_data;
  },

  base_decrypt: (data) => {
    var buff = new Buffer(data, 'base64');
    var dec_data = buff.toString('ascii');
    return dec_data;
  },

  password_enc: async (data) => {
    var salt = crypto.randomBytes(16).toString('base64');
    var rsalt = Buffer.from(salt).toString('base64');
    const result = await encrypt_password(data, rsalt, defaultIterations, defaultKeyLength, 'sha1');
    return { salt: salt, encr: result };
  },

  password_dec: async (data, salt, cb) => {
    var rsalt = Buffer.from(salt).toString('base64');
    const result = await encrypt_password(data, rsalt, defaultIterations, defaultKeyLength, 'sha1');
    return result;
  },
};

async function encrypt_password(password, salt, defaultIterations, length, algorithm) {
  return new Promise((res, rej) => {
    crypto.pbkdf2(password, salt, defaultIterations, length, algorithm, (err, key) => {
      err ? rej(err) : res(key.toString('base64'));
    });
  });
}
module.exports.referral = () => {
  var result = '',
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz',
    Length = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * Length));
  }
  return result;
};

module.exports.generate_id = () => {
  var result = '',
    characters = '0123456789',
    Length = characters.length;
  for (let i = 0; i < 5; i++) {
    result += characters.charAt(Math.floor(Math.random() * Length));
  }
  return result;
};
module.exports.uni_id = () => {
  var result = '',
    characters = '0123456789',
    Length = characters.length;
  for (let i = 0; i < 9; i++) {
    result += characters.charAt(Math.floor(Math.random() * Length));
  }
  return result;
};
