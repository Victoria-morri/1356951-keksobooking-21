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

  const noticeElement = document.querySelector(`.notice`);
  const timein = noticeElement.querySelector(`#timein`);
  const timeout = noticeElement.querySelector(`#timeout`);
  window.filter = {
    getTimeout,
    getTimein,
    filterData,
    timein,
    timeout,
    noticeElement
  };
})();
