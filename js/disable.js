'use strict';
(function () {
// fieldsetArray  mapFiltersArray
  const set = function (arrayName) {
    for (let i = 0; i < arrayName.length; i++) {
      arrayName[i].setAttribute(`disabled`, `disabled`);
    }
  };
  // fieldsetArray window.disable.mapFiltersArray
  const unset = function (arrayName) {
    for (let i = 0; i < arrayName.length; i++) {
      arrayName[i].removeAttribute(`disabled`);
    }
  };

  window.disable = {
    set,
    unset
  };

})();
