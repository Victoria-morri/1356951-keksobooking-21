'use strict';

(function () {

  const getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  const getRndI = function (array) {
    const result = array[getRandomInteger(0, array.length - 1)];
    return result;
  };

  const getRndArray = function (options) {
    const uniqFeatures = [];
    const rndInteger = getRandomInteger(0, options.length);
    for (let i = 0; i < rndInteger; i++) {
      uniqFeatures.push(options[i]);
    }
    return uniqFeatures;
  };

  const shuffle = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = getRandomInteger(0, i);
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getAvatarArray = function () {
    const avatarArray = [];
    for (let i = 1; i <= QUANTITY_ADVERTAISEMENTS; i++) {
      avatarArray.push(i);
    }
    return avatarArray;
  };

  const QUANTITY_ADVERTAISEMENTS = 8;

  window.rndFunction = {
    getRandomInteger,
    getRndI,
    getRndArray,
    shuffle,
    getAvatarArray,
    QUANTITY_ADVERTAISEMENTS

  };
}());
