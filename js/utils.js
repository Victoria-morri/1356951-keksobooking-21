'use strict';
(function () {

  const disable = function (arrayName) {
    for (let i = 0; i < arrayName.length; i++) {
      arrayName[i].setAttribute(`disabled`, `disabled`);
    }
  };

  const undisable = function (arrayName) {
    for (let i = 0; i < arrayName.length; i++) {
      arrayName[i].removeAttribute(`disabled`);
    }
  };

  const resetMap = function () {
    mapFiltersElement.reset();
    mapElement.classList.add(`map--faded`);
    disable(mapFieldsArray);
  };

  const resetForm = function () {
    adFormElement.reset();
    adFormElement.classList.add(`ad-form--disabled`);
    disable(formFieldsArray);
  };

  const activate = function (element1, classNeeded, array1) {
    element1.classList.remove(classNeeded);
    undisable(array1);
  };

  const noticeElement = document.querySelector(`.notice`);
  const mapElement = document.querySelector(`.map`);
  const adFormElement = noticeElement.querySelector(`.ad-form`);
  const formFieldsetElements = adFormElement.querySelectorAll(`fieldset`);
  const formSelectElements = adFormElement.querySelectorAll(`select`);
  const mapFiltersElement = document.querySelector(`.map__filters`);
  const mapFieldsetElements = mapFiltersElement.querySelectorAll(`fieldset`);
  const mapSelectElements = mapFiltersElement.querySelectorAll(`select`);
  const mapFieldsArray = Array.from(mapFieldsetElements).concat(Array.from(mapSelectElements));
  const formFieldsArray = Array.from(formFieldsetElements).concat(Array.from(formSelectElements));

  window.utils = {
    disable,
    undisable,
    activate,
    resetMap,
    resetForm,
    mapElement,
    noticeElement,
    adFormElement,
    mapFiltersElement,
    mapFieldsArray,
    formFieldsArray
  };

})();

