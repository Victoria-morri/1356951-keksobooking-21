'use strict';

const fillAdressInput = function (width, height) {
  adressInputElement.value = `left: ${parseInt(mapPinMainElement.style.left, Number) + width}px; top: ${parseInt(mapPinMainElement.style.top, Number) + height}px`;
};

const unsetDisabled = function () {
  for (let i = 0; i < window.disable.fieldsetArray.length; i++) {
    window.disable.fieldsetArray[i].removeAttribute(`disabled`);
  }
  for (let i = 0; i < window.disable.mapFiltersArray.length; i++) {
    window.disable.mapFiltersArray[i].removeAttribute(`disabled`);
  }
  mapElement.classList.remove(`map--faded`);
  adFormElement.classList.remove(`ad-form--disabled`);
  mapPinsElement.appendChild(window.mapPinsCreate.renderMapPinsList());
  mapElement.appendChild(window.mapPinsCreate.renderMapElementList());
};

const activateMap = function () {
  unsetDisabled();
  fillAdressInput(window.advertaisementCreate.PIN_WIDTH_HALF, window.advertaisementCreate.PIN_HEIGHT);
};

const onMouseLeftButtonDown = function (evt) {
  if (evt.button === 0) {
    activateMap();
    removeListeners();
  }
};

const onKeyEnterDown = function (evt) {
  if (evt.key === `Enter`) {
    activateMap();
    removeListeners();
  }
};

const removeListeners = function () {
  mapPinMainElement.removeEventListener(`keydown`, onKeyEnterDown);
  mapPinMainElement.removeEventListener(`mousedown`, onMouseLeftButtonDown);
};

const mapElement = document.querySelector(`.map`);
const mapPinsElement = mapElement.querySelector(`.map__pins`);
const adressInputElement = window.form.noticeElement.querySelector((`#address`));
const mapPinMainElement = document.querySelector(`.map__pin--main`);
const adFormElement = window.form.noticeElement.querySelector(`.ad-form`);

mapPinMainElement.addEventListener(`keydown`, onKeyEnterDown);
mapPinMainElement.addEventListener(`mousedown`, onMouseLeftButtonDown);

fillAdressInput(window.advertaisementCreate.PIN_WIDTH_HALF, window.advertaisementCreate.PIN_HEIGHT / 2);

