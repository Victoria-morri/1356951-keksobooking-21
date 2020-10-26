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
    mapElement.classList.add(`map--faded`);
    adFormElement.reset();
    adFormElement.classList.add(`ad-form--disabled`);
    window.position.mapPinMainElement.addEventListener(`keydown`, onKeyEnterDown);
    window.position.mapPinMainElement.addEventListener(`mousedown`, onMouseLeftButtonDown);
    mapFiltersElement.reset();
    window.position.fillAdressInput(window.position.mapPinMainElement.style.left, window.position.PIN_WIDTH_HALF, window.position.mapPinMainElement.style.top, window.position.PIN_HEIGHT / 2);
    window.popupCard.closeCard();
    window.pin.clearAll();
    window.card.clearAll(currentCards);
    window.disable.set(fieldsetArray);
    window.disable.set(mapFiltersArray);

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

  const onPressEsc2 = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      onFormUnsendMessage();
    }
  };

  const onFormUnsendMessage = function () {
    document.body.removeChild(failMessage);
    document.removeEventListener(`click`, onFormUnsendMessage);
    document.removeEventListener(`keydown`, onPressEsc2);
  };

  const onPressEsc = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      onFormSendMessage();
    }
  };

  const onFormSendMessage = function () {
    document.body.removeChild(successMessage);
    document.removeEventListener(`click`, onFormSendMessage);
    document.removeEventListener(`keydown`, onPressEsc);
  };

  const onSendForm = function (evt) {
    evt.preventDefault();
    window.load(onSuccessFormSend, onFailFormSend, `https://21.javascript.pages.academy/keksobooking`, `POST`, new FormData(adFormElement));
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
  const mapFiltersElement = document.querySelector(`.map__filters`);
  const housingType = mapFiltersElement.querySelector(`#housing-type`);
  const successElement = document.querySelector(`#success`).content.querySelector(`.success`);
  const successMessage = successElement.cloneNode(true);
  const failElement = document.querySelector(`#error`).content.querySelector(`.error`);
  const failMessage = failElement.cloneNode(true);
  const errorButton = failMessage.querySelector(`.error__button`);
  let mapsPinsElements = document.querySelectorAll(`.map__pin`);
  let popupElements = document.querySelectorAll(`.map__card`);
  let chosenHousingType;
  let data = [];
  let currentCards;
  let currentPins;

  const onSuccess = function (array) {
    data = array;
    renderPins(window.filter.filterData(data));
    window.disable.unset(fieldsetArray);
    window.disable.unset(mapFiltersArray);
    mapElement.classList.remove(`map--faded`);
    adFormElement.classList.remove(`ad-form--disabled`);
    const errorMessageElement = document.querySelector(`.error-message`);
    window.popupCard.error(errorMessageElement);
    housingType.addEventListener(`change`, function (evt) {
      const type = evt.target.value;
      chosenHousingType = type !== `any` ? type : ``;
      renderPins(window.filter.filterData(array, chosenHousingType));
    });
    mapFiltersElement.addEventListener(`change`, window.popupCard.closeCard);
    adFormElement.addEventListener(`submit`, onSendForm);
    adFormElement.addEventListener(`reset`, onResetForm);
  };

  const onFailFormSend = function () {
    document.body.appendChild(failMessage);
    document.addEventListener(`click`, onFormUnsendMessage);
    document.addEventListener(`keydown`, onPressEsc2);
    errorButton.addEventListener(`click`, onFormUnsendMessage);
  };

  const onSuccessFormSend = function () {
    onResetForm();
    document.body.appendChild(successMessage);
    document.addEventListener(`click`, onFormSendMessage);
    document.addEventListener(`keydown`, onPressEsc);
    adFormElement.removeEventListener(`submit`, onSendForm);
    adFormElement.removeEventListener(`reset`, onResetForm);
  };

  window.position.mapPinMainElement.addEventListener(`mousedown`, window.position.movePin);

  window.form = {
    dependenceOfInputs,
    onMouseLeftButtonDown,
    onKeyEnterDown,
    capacityElement,
    roomNumberElement,
    noticeElement,
    fieldsetArray,
    mapFiltersArray
  };
}());
