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

  const renderPins = function (arrayX) {
    const arrayForUse = arrayX.length > 5 ? arrayX.slice(0, 5) : arrayX;
    window.pin.clearAll();
    window.card.clearAll(currentCards);
    currentPins = window.pin.renderAll(arrayForUse);
    currentCards = window.card.renderAll(arrayForUse);
    mapElement.appendChild(currentCards);
    mapPinsElement.appendChild(currentPins);
    mapsPinsElements = document.querySelectorAll(`.map__pin`);
    popupElements = document.querySelectorAll(`.map__card`);
    window.popupCard.getInteractive(mapsPinsElements, popupElements);
  };

  const addListToCloseCard = function (array) {
    for (let i = 0; i < array.length; i++) {
      array[i].addEventListener(`change`, window.popupCard.closeCard);
    }
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
  const mapFilters = document.querySelector(`.map__filters`);
  const housingType = mapFilters.querySelector(`#housing-type`);
  const mapsFilters = mapFilters.querySelectorAll(`.map__filter`);
  const mapsFeatures = mapFilters.querySelector(`.map__features`);
  const inputs = mapsFeatures.querySelectorAll(`input`);
  let mapsPinsElements = document.querySelectorAll(`.map__pin`);
  let popupElements = document.querySelectorAll(`.map__card`);
  let chosenHousingType;
  let data = [];
  let currentCards;
  let currentPins;

  const onSuccess = function (array) {
    data = array;
    renderPins(window.filter.data(array));
    window.disable.unset(fieldsetArray);
    window.disable.unset(mapFiltersArray);
    fillAdressInput(window.position.PIN_WIDTH_HALF, window.position.PIN_HEIGHT);
    mapElement.classList.remove(`map--faded`);
    adFormElement.classList.remove(`ad-form--disabled`);
    mapElement.appendChild(window.card.renderAll(array));
    const errorMessageElement = document.querySelector(`.error-message`);
    window.popupCard.error(errorMessageElement);
    housingType.addEventListener(`change`, function (evt) {
      const type = evt.target.value;
      chosenHousingType = type !== `any` ? type : ``;
      renderPins(window.filter.data(array, chosenHousingType));
    });
    addListToCloseCard(mapsFilters);
    addListToCloseCard(inputs);
  };

  window.form = {
    dependenceOfInputs,
    onMouseLeftButtonDown,
    onKeyEnterDown,
    fillAdressInput,
    mapPinMainElement,
    capacityElement,
    roomNumberElement,
    noticeElement,
    fieldsetArray,
    mapFiltersArray
  };
}());
