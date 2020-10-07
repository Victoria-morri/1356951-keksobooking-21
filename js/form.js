'use strict';

(function () {

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
    mapElement.appendChild(window.mapCardCreate.renderMapElementList());
  };

  const activateMap = function () {
    unsetDisabled();
    fillAdressInput(window.advertaisementCreate.PIN_WIDTH_HALF, window.advertaisementCreate.PIN_HEIGHT);
  };

  const removeListeners = function () {
    mapPinMainElement.removeEventListener(`keydown`, window.form.onKeyEnterDown);
    mapPinMainElement.removeEventListener(`mousedown`, window.form.onMouseLeftButtonDown);
  };

  const dependenceOfInputs = function () {
    const actualRoomNumber = parseInt(roomNumberElement.value, 10);
    const actualCapacity = parseInt(capacityElement.value, 10);
    if (actualRoomNumber < actualCapacity) {
      capacityElement.setCustomValidity(`Количество гостей должно соответствовать колличеству комнат. Уменьшите количество гостей.`);
    } else {
      capacityElement.setCustomValidity(``);
    }
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

  const noticeElement = document.querySelector(`.notice`);
  const roomNumberElement = noticeElement.querySelector(`#room_number`);
  const capacityElement = noticeElement.querySelector(`#capacity`);
  const mapElement = document.querySelector(`.map`);
  const mapPinsElement = mapElement.querySelector(`.map__pins`);
  const adressInputElement = noticeElement.querySelector((`#address`));
  const adFormElement = noticeElement.querySelector(`.ad-form`);
  const mapPinMainElement = document.querySelector(`.map__pin--main`);

  window.form = {
    dependenceOfInputs,
    onMouseLeftButtonDown,
    onKeyEnterDown,
    fillAdressInput,
    noticeElement,
    mapPinMainElement,
    capacityElement,
    roomNumberElement
  };
}());
