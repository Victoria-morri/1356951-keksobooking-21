'use strict';
(function () {
  const DEBOUNCE_INTERVAL = 500; // ms


  window.debounce = function (cb) {
    let lastTimeout = null;
    return function (parameter) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb(parameter);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();

