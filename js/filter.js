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

  const filterData = function (dataArray, chosenType) {
    const arrayToUse = chosenType ? dataArray.filter(function (dataOne) {
      return dataOne.offer.type === chosenType;
    }) : dataArray;
    return arrayToUse;
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

  const getFeaturesArray2 = function (dataArray, features) {
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

  const filterData2 = function (dataArray, {type, price, rooms, guests, features}) {
    let arrayType = getTypeArray(dataArray, type);
    let arrayTypePrice = getPriceArray(arrayType, price);
    let arrayTypePriceRooms = getRoomsArray(arrayTypePrice, rooms);
    let arrayTypePriceRoomsGuests = getGuestsArray(arrayTypePriceRooms, guests);
    let arrayFeatures = getFeaturesArray2(arrayTypePriceRoomsGuests, features);
    return arrayFeatures;
  };

  const timein = window.disable.noticeElement.querySelector(`#timein`);
  const timeout = window.disable.noticeElement.querySelector(`#timeout`);
  window.filter = {
    getTimeout,
    getTimein,
    filterData,
    filterData2,
    timein,
    timeout,
  };
})();

