'use strict';
(function () {
  const PRICE = {
    low: 10000,
    high: 50000
  };

  const getTimeout = function () {
    timeout.value = timein.value;
  };

  const getTimein = function () {
    timein.value = timeout.value;
  };

  const getTypeArray = function (dataArray, type) {
    let arrayToUse = type !== `any` ? dataArray.filter(function (dataOne) {
      return dataOne.offer.type === type;
    }) : dataArray;
    return arrayToUse;
  };

  const getPriceArray = function (dataArray, price) {
    let arrayToUse = dataArray;
    if (price !== `any`) {
      if (price === `middle`) {
        arrayToUse = arrayToUse.filter(function (dataOne) {
          return dataOne.offer.price <= PRICE.high && dataOne.offer.price >= PRICE.low;
        });
      } else if (price === `low`) {
        arrayToUse = arrayToUse.filter(function (dataOne) {
          return dataOne.offer.price < PRICE.low;
        });
      } else if (price === `high`) {
        arrayToUse = arrayToUse.filter(function (dataOne) {
          return dataOne.offer.price > PRICE.high;
        });
      }
    } else {
      return arrayToUse;
    }
    return arrayToUse;
  };

  const getRoomsArray = function (dataArray, rooms) {
    let arrayToUse = rooms !== `any` ? dataArray.filter(function (dataOne) {
      return dataOne.offer.rooms === parseInt(rooms, 10);
    }) : dataArray;
    return arrayToUse;
  };

  const getGuestsArray = function (dataArray, rooms) {
    let arrayToUse;
    if (rooms !== `any`) {
      arrayToUse = rooms !== `0` ? dataArray.filter(function (dataOne) {
        return dataOne.offer.guests === parseInt(rooms, 10) || dataOne.offer.guests > parseInt(rooms, 10);
      }) : dataArray.filter(function (dataOne) {
        return dataOne.offer.guests === parseInt(rooms, 10);
      });
    } else {
      arrayToUse = dataArray;
    }
    return arrayToUse;
  };

  const getFeaturesArray = function (dataArray, features) {
    const arrayToUse = dataArray.filter(function (item) {
      for (let j = 0; j < features.length; j++) {
        if ((item.offer.features.includes(features[j])) === false) {
          return false;
        }
      }
      return true;
    });
    return arrayToUse;
  };

  const filterData = function (dataArray, {type, price, rooms, guests, features}) {
    let arrayToUse;
    arrayToUse = getTypeArray(dataArray, type);
    arrayToUse = getPriceArray(arrayToUse, price);
    arrayToUse = getRoomsArray(arrayToUse, rooms);
    arrayToUse = getGuestsArray(arrayToUse, guests);
    arrayToUse = getFeaturesArray(arrayToUse, features);
    return arrayToUse;
  };

  const timein = window.disable.noticeElement.querySelector(`#timein`);
  const timeout = window.disable.noticeElement.querySelector(`#timeout`);
  window.filter = {
    getTimeout,
    getTimein,
    filterData,
    timein,
    timeout,
  };
})();

