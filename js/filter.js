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

  const filterData = function (dataArray) {
    let resalt;
    let arrayToUse = dataArray.filter(function (item) {
      resalt = offer.type !== `any` ? item.offer.type === offer.type : true;
      if (resalt !== false) {
        if (offer.price !== `any`) {
          if (offer.price === `middle`) {
            resalt = item.offer.price <= PRICE.high && item.offer.price >= PRICE.low;
          } else if (offer.price === `low`) {
            resalt = item.offer.price < PRICE.low;
          } else if (offer.price === `high`) {
            resalt = item.offer.price > PRICE.high;
          }
        } else {
          resalt = true;
        }
      }
      if (resalt !== false) {
        resalt = offer.rooms !== `any` ? item.offer.rooms === offer.rooms : true;
      }
      if (resalt !== false) {
        const guestsNumber = parseInt(offer.guests, 10);
        if (offer.guests !== `any`) {
          resalt = offer.guests !== `0` ? item.offer.guests >= guestsNumber : item.offer.guests === guestsNumber;
        }
      }
      if (resalt !== false) {
        for (let j = 0; j < offer.features.length; j++) {
          if ((item.offer.features.includes(offer.features[j])) === false) {
            return false;
          }
        }
        return true;
      }
      return resalt;
    });
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

