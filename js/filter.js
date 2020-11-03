'use strict';
(function () {
  const PRICE = {
    low: 10000,
    high: 50000
  };
  const mapFeatures = window.utils.mapFiltersElement.querySelector(`.map__features`);
  const inputsmapFeatures = mapFeatures.querySelectorAll(`input`);
  let offer = {
    type: `any`,
    price: `any`,
    rooms: `any`,
    guests: `any`,
    features: []
  };

  const changePriceOffer = function (evt) {
    offer.price = evt.target.value;
  };

  const changeRoomsOffer = function (evt) {
    offer.rooms = evt.target.value;
  };

  const changeHousingOffer = function (evt) {
    offer.type = evt.target.value;
  };

  const changeGuestsOffer = function (evt) {
    offer.guests = evt.target.value;
  };

  const changeMapFeatures = function () {
    offer.features = [];
    inputsmapFeatures.forEach(function (item) {
      if (item.checked) {
        offer.features.push(item.value);
      }
    });
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
    }
    return arrayToUse;
  };

  const getRoomsArray = function (dataArray, rooms) {
    const roomsNumber = parseInt(rooms, 10);
    let arrayToUse = rooms !== `any` ? dataArray.filter(function (dataOne) {
      return dataOne.offer.rooms === roomsNumber;
    }) : dataArray;
    return arrayToUse;
  };

  const getGuestsArray = function (dataArray, guests) {
    let arrayToUse;
    const guestsNumber = parseInt(guests, 10);
    if (guests !== `any`) {
      arrayToUse = guests !== `0` ? dataArray.filter(function (dataOne) {
        return dataOne.offer.guests >= guestsNumber;
      }) : dataArray.filter(function (dataOne) {
        return dataOne.offer.guests === guestsNumber;
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

  const filterData = function (dataArray) {
    /* arrayToUse = getTypeArray(dataArray, type);
    arrayToUse = getPriceArray(arrayToUse, price);
    arrayToUse = getRoomsArray(arrayToUse, rooms);
    arrayToUse = getGuestsArray(arrayToUse, guests);*/
    let arrayToUse = getFeaturesArray(getGuestsArray(getRoomsArray(getPriceArray(getTypeArray(dataArray, offer.type), offer.price), offer.rooms), offer.guests), offer.features);
    arrayToUse = arrayToUse.length > 5 ? arrayToUse.slice(0, 5) : arrayToUse;
    return arrayToUse;
  };

  window.filter = {
    changePriceOffer,
    changeRoomsOffer,
    changeHousingOffer,
    changeGuestsOffer,
    changeMapFeatures,
    filterData,
  };
})();

