'use strict';
(function () {
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

  const tyt = function (dataArray, parameter) {
    let arrayToUse = parameter !== `any` ? dataArray.filter(function (dataOne) {
      return dataOne.offer.type === parameter;
    }) : dataArray;
    return arrayToUse;
    console.log(arrayToUse);
  };

  const filterData2 = function (dataArray, {type, price/*  , rooms, guests*/}) {
    let arrayToUse = tyt(dataArray, type);
    if (price !== `any`) {
      if (price === `middle`) {
        arrayToUse = price ? arrayToUse.filter(function (dataOne) {
          return dataOne.offer.price <= 50000 && dataOne.offer.price >= 10000;
        }) : arrayToUse;
      } else if (price === `low`) {
        arrayToUse = price ? arrayToUse.filter(function (dataOne) {
          return dataOne.offer.price < 10000;
        }) : arrayToUse;
      } else if (price === `high`) {
        arrayToUse = price ? arrayToUse.filter(function (dataOne) {
          return dataOne.offer.price > 50000;
        }) : arrayToUse;
      } else {
        return arrayToUse;
      }
    }
    /* arrayToUse = price ? dataArray.filter(function (dataOne) {
      return dataOne.offer.price === price;
    }) : arrayToUse;*/
    console.log(arrayToUse);
    return arrayToUse;
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
/*
     type: `any`,
    price: `any`,
    rooms: `any`,
    guests: `any`*/
