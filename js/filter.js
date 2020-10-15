'use strict';
(function () {
  const getTimeout = function () {
    timeout.value = timein.value;
  };

  const getTimein = function () {
    timein.value = timeout.value;
  };

  const data = function (dataArray, chosenType) {
    const tyt = chosenType ? dataArray.filter(function (dataOne) {
      return dataOne.offer.type === chosenType;
    }) : dataArray;
    /* const sameTypeHousing = dataArray.filter(function (dataOne) {
      return dataOne.offer.type === chosenType;
    });*/
    return tyt;
  };
  const timein = window.form.noticeElement.querySelector(`#timein`);
  const timeout = window.form.noticeElement.querySelector(`#timeout`);
  window.filter = {
    getTimeout,
    getTimein,
    data,
    timein,
    timeout
  };
})();
