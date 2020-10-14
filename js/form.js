'use strict';

(function () {

  const fillAdressInput = function (width, height) {
    adressInputElement.value = `left: ${parseInt(mapPinMainElement.style.left, 10) + width}px; top: ${parseInt(mapPinMainElement.style.top, 10) + height}px`;
  };

  const onError = function (message) {
    const error = document.createElement(`h2`);
    error.classList.add(`error-message`);
    error.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    error.style.position = `absolute`;
    error.style.left = 0;
    error.style.right = 0;
    error.style.color = `white`;
    error.style.fontSize = `50px`;
    error.textContent = message;
    document.body.insertAdjacentElement(`afterbegin`, error);
  };

  const create = function (card) {
    const pinMap = window.pin.mapPinElement.cloneNode(true);
    pinMap.style = `left: ${card.location.x}px; top: ${card.location.y}px`;
    pinMap.querySelector(`img`).src = card.author.avatar;
    pinMap.querySelector(`img`).alt = card.offer.title;
    return pinMap;
  };

  const onSuccess = function (array) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < array.length; i++) {
      fragment.appendChild(create(array[i]));
    }
    mapPinsElement.appendChild(fragment);
    window.disable.unset(fieldsetArray);
    window.disable.unset(mapFiltersArray);
    fillAdressInput(window.position.PIN_WIDTH_HALF, window.position.PIN_HEIGHT);
    mapElement.classList.remove(`map--faded`);
    adFormElement.classList.remove(`ad-form--disabled`);
    mapElement.appendChild(window.card.renderMapElementList(array));
    const errorMessage = document.querySelector(`.error-message`);
    window.popupCard.error(errorMessage);
    const mapsPinsElements = document.querySelectorAll(`.map__pin`);
    const popupElements = document.querySelectorAll(`.map__card`);
    window.popupCard.getInteractive(mapsPinsElements, popupElements);

  };

  const activateMap = function () {
    window.load(onSuccess, onError);
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

  const getTimeout = function () {
    timeout.value = timein.value;
  };

  const getTimein = function () {
    timein.value = timeout.value;
  };

  const blockInputElements = document.querySelectorAll(`fieldset`);
  const mapFilterElements = document.querySelectorAll(`select`);
  const fieldsetArray = Array.from(blockInputElements);
  const mapFiltersArray = Array.from(mapFilterElements);
  const noticeElement = document.querySelector(`.notice`);
  const adFormElement = noticeElement.querySelector(`.ad-form`);
  const mapElement = document.querySelector(`.map`);
  const mapPinsElement = mapElement.querySelector(`.map__pins`);
  const roomNumberElement = noticeElement.querySelector(`#room_number`);
  const capacityElement = noticeElement.querySelector(`#capacity`);
  const adressInputElement = noticeElement.querySelector((`#address`));
  const mapPinMainElement = document.querySelector(`.map__pin--main`);
  const timein = noticeElement.querySelector(`#timein`);
  const timeout = noticeElement.querySelector(`#timeout`);

  window.form = {
    dependenceOfInputs,
    onMouseLeftButtonDown,
    onKeyEnterDown,
    fillAdressInput,
    getTimeout,
    getTimein,
    mapPinMainElement,
    capacityElement,
    roomNumberElement,
    noticeElement,
    fieldsetArray,
    mapFiltersArray,
    timein,
    timeout

  };
}());
