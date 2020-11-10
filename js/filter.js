'use strict';
const PRICE = {
  low: 10000,
  high: 50000
};
const OFFER_QUANTITY = 5;
const mapFeatures = window.utils.mapFiltersElement.querySelector(`.map__features`);
const inputsmapFeatures = mapFeatures.querySelectorAll(`input`);
let offer = {
  type: `any`,
  price: `any`,
  rooms: `any`,
  guests: `any`,
  features: []
};

const resetOffer = function () {
  offer = {
    type: `any`,
    price: `any`,
    rooms: `any`,
    guests: `any`,
    features: []
  };
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

const filterData = function (dataArray) {
  let result;
  let arrayToUse = dataArray.filter(function (item) {
    result = offer.type !== `any` ? item.offer.type === offer.type : true;
    if (result !== false) {
      if (offer.price !== `any`) {
        if (offer.price === `middle`) {
          result = item.offer.price <= PRICE.high && item.offer.price >= PRICE.low;
        } else if (offer.price === `low`) {
          result = item.offer.price < PRICE.low;
        } else if (offer.price === `high`) {
          result = item.offer.price > PRICE.high;
        }
      } else {
        result = true;
      }
    }

    if (result !== false) {
      result = offer.rooms !== `any` ? item.offer.rooms === window.utils.getNumber(offer.rooms) : true;
    }
    if (result !== false) {
      const guestsNumber = window.utils.getNumber(offer.guests);
      if (offer.guests !== `any`) {
        result = offer.guests !== `0` ? item.offer.guests >= guestsNumber : item.offer.guests === guestsNumber;
      }
    }
    if (result !== false) {
      for (let j = 0; j < offer.features.length; j++) {
        if ((item.offer.features.includes(offer.features[j])) === false) {
          return false;
        }
      }
    }
    return result;
  });
  arrayToUse = arrayToUse.length > OFFER_QUANTITY ? arrayToUse.slice(0, OFFER_QUANTITY) : arrayToUse;
  return arrayToUse;
};

window.filter = {
  changePriceOffer,
  changeRoomsOffer,
  changeHousingOffer,
  changeGuestsOffer,
  changeMapFeatures,
  filterData,
  resetOffer
};


