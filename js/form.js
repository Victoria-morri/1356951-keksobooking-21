'use strict';

(function () {

  const activateMap = function () {
    window.load(onSuccess, window.error.on, `https://21.javascript.pages.academy/keksobooking/data`, `GET`);
  };

  const removeListeners = function () {
    window.position.mapPinMainElement.removeEventListener(`keydown`, window.form.onKeyEnterDown);
    window.position.mapPinMainElement.removeEventListener(`mousedown`, window.form.onMouseLeftButtonDown);
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

  const onResetForm = function (evt) {
    if (evt) {
      evt.preventDefault();
    }
    window.position.start();
    window.disable.reset(adFormElement, adFormElement, `ad-form--disabled`, formFieldsetElements, formSelectElements);
    window.position.fillAdressInput(window.position.mapPinMainElement.style.left, window.position.PIN_WIDTH_HALF, window.position.mapPinMainElement.style.top, window.position.PIN_HEIGHT / 2);
    window.disable.reset(mapFiltersElement, mapElement, `map--faded`, mapFieldsetElements, mapSelectElements);
    window.disable.clearPinsCards(currentCards);
    window.position.mapPinMainElement.addEventListener(`keydown`, onKeyEnterDown);
    window.position.mapPinMainElement.addEventListener(`mousedown`, onMouseLeftButtonDown);
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

  const onSendForm = function (evt) {
    evt.preventDefault();
    window.load(onSuccessFormSend, onFailFormSend, `https://21.javascript.pages.academy/keksobooking`, `POST`, new FormData(adFormElement));
  };

  const onfilterHousingType = function (evt) {
    const type = evt.target.value;
    chosenHousingType = type !== `any` ? type : ``;
    renderPins(window.filter.filterData(data, chosenHousingType));
  };

  const adFormElement = window.filter.noticeElement.querySelector(`.ad-form`);
  const formFieldsetElements = adFormElement.querySelectorAll(`fieldset`);
  const formSelectElements = adFormElement.querySelectorAll(`select`);
  const resetElement = adFormElement.querySelector(`.ad-form__reset`);
  const mapElement = document.querySelector(`.map`);
  const mapPinsElement = mapElement.querySelector(`.map__pins`);
  const roomNumberElement = window.filter.noticeElement.querySelector(`#room_number`);
  const capacityElement = window.filter.noticeElement.querySelector(`#capacity`);
  const mapFiltersElement = document.querySelector(`.map__filters`);
  const mapFieldsetElements = mapFiltersElement.querySelectorAll(`fieldset`);
  const mapSelectElements = mapFiltersElement.querySelectorAll(`select`);
  const housingType = mapFiltersElement.querySelector(`#housing-type`);
  let mapsPinsElements = document.querySelectorAll(`.map__pin`);
  let popupElements = document.querySelectorAll(`.map__card`);
  let chosenHousingType;
  let data = [];
  let currentCards;
  let currentPins;

  const onSuccess = function (array) {
    data = array;
    renderPins(window.filter.filterData(data));
    window.disable.unreset(mapElement, `map--faded`, mapFieldsetElements, mapSelectElements);
    window.disable.unreset(adFormElement, `ad-form--disabled`, formFieldsetElements, formSelectElements);
    const errorMessageElement = document.querySelector(`.error-message`);
    window.popupCard.error(errorMessageElement);
    housingType.addEventListener(`change`, onfilterHousingType);
    mapFiltersElement.addEventListener(`change`, window.popupCard.closeCard);
    adFormElement.addEventListener(`submit`, onSendForm);
    resetElement.addEventListener(`click`, onResetForm);
  };

  const onFailFormSend = function () {
    window.message.showError();
  };

  const onSuccessFormSend = function () {
    onResetForm();
    window.message.showSuccess();
    adFormElement.removeEventListener(`submit`, onSendForm);
    resetElement.removeEventListener(`click`, onResetForm);
  };

  window.position.mapPinMainElement.addEventListener(`mousedown`, window.position.movePin);

  window.form = {
    dependenceOfInputs,
    onMouseLeftButtonDown,
    onKeyEnterDown,
    capacityElement,
    roomNumberElement,
    formFieldsetElements,
    formSelectElements,
    mapFieldsetElements,
    mapSelectElements
  };
}());
