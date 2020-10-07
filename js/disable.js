'use strict';
(function () {

  const setDisable = function () {

    for (let i = 0; i < fieldsetArray.length; i++) {
      fieldsetArray[i].setAttribute(`disabled`, `disabled`);
    }
    for (let i = 0; i < mapFiltersArray.length; i++) {
      mapFiltersArray[i].setAttribute(`disabled`, `disabled`);
    }
  };

  const blockInputElements = document.querySelectorAll(`fieldset`);
  const mapFilterElements = document.querySelectorAll(`select`);
  const fieldsetArray = Array.from(blockInputElements);
  const mapFiltersArray = Array.from(mapFilterElements);

  window.disable = {
    setDisable,
    blockInputElements,
    mapFilterElements,
    mapFiltersArray,
    fieldsetArray
  };

})();
