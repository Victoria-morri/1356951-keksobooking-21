'use strict';

(function () {

  const DATA_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_TO_SEND = `https://21.javascript.pages.academy/keksobooking`;

  const activateMap = function () {
    window.load({
      onSuccess,
      onError: window.message.show,
      url: DATA_URL,
      method: `GET`,
      dataX: ``
    });
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
    window.disable.resetForm();
    window.position.fillAdressInput(window.position.mapPinMainElement.style.left, window.position.PIN_WIDTH_HALF, window.position.mapPinMainElement.style.top, window.position.PIN_HEIGHT / 2);
    window.disable.resetMap();
    window.popupCard.onCloseCard();
    window.card.clearPinsCards(currentCards);
    window.position.mapPinMainElement.addEventListener(`keydown`, onKeyEnterDown);
    window.position.mapPinMainElement.addEventListener(`mousedown`, onMouseLeftButtonDown);
  };

  const renderPins = function (arrayX) {
    const arrayForUse = arrayX.length > 5 ? arrayX.slice(0, 5) : arrayX;
    window.pin.clearAll();
    window.card.clearAll(currentCards);
    currentPins = window.pin.renderAll(arrayForUse);
    currentCards = window.card.renderAll(arrayForUse);
    window.disable.mapElement.appendChild(currentCards);
    mapPinsElement.appendChild(currentPins);
    mapsPinsElements = document.querySelectorAll(`.map__pin`);
    popupElements = document.querySelectorAll(`.map__card`);
    window.popupCard.getInteractive(mapsPinsElements, popupElements);
  };

  const onSendForm = function (evt) {
    evt.preventDefault();
    window.load({
      onSuccess: onSuccessFormSend,
      onError: onFailFormSend,
      url: URL_TO_SEND,
      method: `POST`,
      dataX: new FormData(window.disable.adFormElement)
    });
  };

  const onfilterHousingType = function (evt) {
    const type = evt.target.value;
    chosenHousingType = type !== `any` ? type : ``;
    renderPins(window.filter.filterData(data, chosenHousingType));
  };

  const resetElement = window.disable.adFormElement.querySelector(`.ad-form__reset`);
  const mapPinsElement = window.disable.mapElement.querySelector(`.map__pins`);
  const roomNumberElement = window.disable.noticeElement.querySelector(`#room_number`);
  const capacityElement = window.disable.noticeElement.querySelector(`#capacity`);
  const housingType = window.disable.mapFiltersElement.querySelector(`#housing-type`);
  let mapsPinsElements = document.querySelectorAll(`.map__pin`);
  let popupElements = document.querySelectorAll(`.map__card`);
  let chosenHousingType;
  let data = [];
  let currentCards;
  let currentPins;

  const onSuccess = function (array) {
    data = array;
    renderPins(window.filter.filterData(data));
    window.disable.activate(window.disable.mapElement, `map--faded`, window.disable. mapFieldsArray);
    window.disable.activate(window.disable.adFormElement, `ad-form--disabled`, window.disable.formFieldsArray);
    const errorMessageElement = document.querySelector(`.error-message`);
    window.popupCard.error(errorMessageElement);
    housingType.addEventListener(`change`, onfilterHousingType);
    window.disable.mapFiltersElement.addEventListener(`change`, window.popupCard.onCloseCard);
    window.disable.adFormElement.addEventListener(`submit`, onSendForm);
    resetElement.addEventListener(`click`, onResetForm);
  };

  const onFailFormSend = function () {
    window.message.showError();
  };

  const onSuccessFormSend = function () {
    onResetForm();
    window.message.showSuccess();
    window.disable.adFormElement.removeEventListener(`submit`, onSendForm);
    resetElement.removeEventListener(`click`, onResetForm);
  };

  window.position.mapPinMainElement.addEventListener(`mousedown`, window.position.movePin);

  window.form = {
    dependenceOfInputs,
    onMouseLeftButtonDown,
    onKeyEnterDown,
    capacityElement,
    roomNumberElement
  };
}());
