const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(isDirect = true) {
    this.isDirect = isDirect;
    this.alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }

  encrypt(message, key) {
    this.checkParameters(message, key);

    message = message.toUpperCase();
    key = this.generateKey(message, key);

    let result = '';
    for (let i = 0; i < message.length; i++) {
      if (this.alphabet.includes(message[i])) {
        const messageIndex = this.alphabet.indexOf(message[i]);
        const keyIndex = this.alphabet.indexOf(key[i]);
        const encryptedCharIndex = (messageIndex + keyIndex) % 26;
        result += this.alphabet[encryptedCharIndex];
      } else {
        result += message[i];
      }
    }

    return this.isDirect ? result : result.split('').reverse().join('');
  }

  decrypt(encryptedMessage, key) {
    this.checkParameters(encryptedMessage, key);

    encryptedMessage = encryptedMessage.toUpperCase();
    key = this.generateKey(encryptedMessage, key);

    let result = '';
    for (let i = 0; i < encryptedMessage.length; i++) {
      if (this.alphabet.includes(encryptedMessage[i])) {
        const encryptedMessageIndex = this.alphabet.indexOf(encryptedMessage[i]);
        const keyIndex = this.alphabet.indexOf(key[i]);
        const decryptedCharIndex = (encryptedMessageIndex - keyIndex + 26) % 26;
        result += this.alphabet[decryptedCharIndex];
      } else {
        result += encryptedMessage[i];
      }
    }

    return this.isDirect ? result : result.split('').reverse().join('');
  }

  checkParameters(message, key) {
    if (typeof message !== 'string' || typeof key !== 'string') {
      throw new Error('Incorrect arguments!');
    }
  }

  generateKey(message, key) {
    let generatedKey = '';
    for (let i = 0, j = 0; i < message.length; i++) {
      if (this.alphabet.includes(message[i])) {
        generatedKey += key[j % key.length].toUpperCase();
        j++;
      } else {
        generatedKey += message[i];
      }
    }
    return generatedKey;
  }
}

module.exports = {
  VigenereCipheringMachine
};
