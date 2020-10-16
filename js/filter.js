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
  const timein = window.form.noticeElement.querySelector(`#timein`);
  const timeout = window.form.noticeElement.querySelector(`#timeout`);
  window.filter = {
    getTimeout,
    getTimein,
    filterData,
    timein,
    timeout
  };
})();
