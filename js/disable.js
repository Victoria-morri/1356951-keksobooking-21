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

  const resetMap = function () {
    mapFiltersElement.reset();
    mapElement.classList.add(`map--faded`);
    set(mapFieldsetElements);
    set(mapSelectElements);
  };

  const resetForm = function () {
    adFormElement.reset();
    adFormElement.classList.add(`ad-form--disabled`);
    set(formFieldsetElements);
    set(formSelectElements);
  };

  const activate = function (element1, classNeeded, array1) {
    element1.classList.remove(classNeeded);
    unset(array1);
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

  window.disable = {
    set,
    unset,
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

