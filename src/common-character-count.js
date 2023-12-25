const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
function getCommonCharacterCount(s1, s2) {
  const count = (str) => str.split('').reduce((acc, char) => {
    acc[char] = (acc[char] || 0) + 1;
    return acc;
  }, {});

  const count1 = count(s1);
  const count2 = count(s2);

  let result = 0;
  for (const char in count1) {
    if (count2[char]) {
      result += Math.min(count1[char], count2[char]);
    }
  }

  return result;
}

module.exports = {
  getCommonCharacterCount
};
