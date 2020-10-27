'use strict';
(function () {

  const set = function (arrayName) {
    for (let i = 0; i < arrayName.length; i++) {
      arrayName[i].setAttribute(`disabled`, `disabled`);
    }
  };

  const unset = function (arrayName) {
    for (let i = 0; i < arrayName.length; i++) {
      arrayName[i].removeAttribute(`disabled`);
    }
  };

  const reset = function (element1, element2, classNeeded, array1, array2) {
    element1.reset();
    element2.classList.add(classNeeded);
    set(array1);
    set(array2);
  };

  const unreset = function (element1, classNeeded, array1, array2) {
    element1.classList.remove(classNeeded);
    unset(array1);
    unset(array2);
  };

  const clearPinsCards = function (array3) {
    window.popupCard.closeCard();
    window.pin.clearAll();
    window.card.clearAll(array3);
  };

  window.disable = {
    set,
    unset,
    reset,
    unreset,
    clearPinsCards
  };

})();
/* // formElement, formElement, `ad-form--disabled`, formFieldsetElements, formSelectElements
  // mapFiltersElement, mapElement, `map--faded`, mapFieldsetElements, mapSelectElements
  const resetForm = function (element1, element2, classNeeded, array1, array2) {
    /* formElement.reset();
    formElement.classList.add(`ad-form--disabled`);
    set(formFieldsetElements);
    set(formSelectElements);
    reset(element1, element2, classNeeded, array1, array2);

  };

  const resetMap = function (element1, element2, classNeeded, array1, array2, array3) {
    /* mapFiltersElement.reset();
    mapElement.classList.add(`map--faded`);
    set(mapFieldsetElements);
    set(mapSelectElements);
    reset(element1, element2, classNeeded, array1, array2);
    window.popupCard.closeCard();
    window.pin.clearAll();
    window.card.clearAll(array3);
  };*/
