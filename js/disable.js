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
    element2.classList.add(`${classNeeded}`);
    set(array1);
    set(array2);

  };

  const resetForm = function () {
    formElement.reset();
    formElement.classList.add(`ad-form--disabled`);
    set(formFieldsetElements);
    set(formSelectElements);
    window.position.fillAdressInput(window.position.mapPinMainElement.style.left, window.position.PIN_WIDTH_HALF, window.position.mapPinMainElement.style.top, window.position.PIN_HEIGHT / 2);

  };

  const resetMap = function (arr) {
    mapFiltersElement.reset();
    mapElement.classList.add(`map--faded`);
    set(mapFieldsetElements);
    set(mapSelectElements);
    window.popupCard.closeCard();
    window.pin.clearAll();
    window.card.clearAll(arr);
  };

  const formElement = document.querySelector(`.ad-form`);
  const formFieldsetElements = formElement.querySelectorAll(`fieldset`);
  const formSelectElements = formElement.querySelectorAll(`select`);
  const mapFiltersElement = document.querySelector(`.map__filters`);
  const mapFieldsetElements = mapFiltersElement.querySelectorAll(`fieldset`);
  const mapSelectElements = mapFiltersElement.querySelectorAll(`select`);
  const mapElement = document.querySelector(`.map`);

  window.disable = {
    set,
    unset,
    resetForm,
    resetMap
  };

})();
