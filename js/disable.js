'use strict';
(function () {
// fieldsetArray  mapFiltersArray
  const setDisable = function (arrayName) {
    for (let i = 0; i < arrayName.length; i++) {
      arrayName[i].setAttribute(`disabled`, `disabled`);
    }
  };
  // fieldsetArray window.disable.mapFiltersArray
  const unsetDisabled = function (arrayName) {
    for (let i = 0; i < arrayName.length; i++) {
      arrayName[i].removeAttribute(`disabled`);
    }
  };

  window.disable = {
    setDisable,
    unsetDisabled
  };

})();
