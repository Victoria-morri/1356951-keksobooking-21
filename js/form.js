'use strict';

(function () {
  const MAIN_PIN_X = 570;
  const MAIN_PIN_Y = 375;

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
      formUnsendMessage();
    }
  };

  const formUnsendMessage = function () {
    document.body.removeChild(failMessage);
    document.removeEventListener(`click`, formUnsendMessage);
    document.removeEventListener(`keydown`, onPressEsc2);
    errorButton.removeEventListener(`click`, formUnsendMessage);
  };

  const onPressEsc = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      formSendMessage();
    }
  };

  const formSendMessage = function () {
    document.body.removeChild(successMessage);
    document.removeEventListener(`click`, formSendMessage);
    document.removeEventListener(`keydown`, onPressEsc);
  };

  const sendForm = function (evt) {
    evt.preventDefault();
    adFormElement.removeEventListener(`submit`, sendForm);
    window.upload(new FormData(adFormElement), onSuccessFormSend, onFailFormSend);
  };

  const blockInputElements = document.querySelectorAll(`fieldset`);
  const mapFilterElements = document.querySelectorAll(`select`);
  const fieldsetArray = Array.from(blockInputElements);
  const mapFiltersArray = Array.from(mapFilterElements);
  const noticeElement = document.querySelector(`.notice`);
  const adFormElement = noticeElement.querySelector(`.ad-form`);
  const reset = adFormElement.querySelector(`.ad-form__reset`);
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
    adFormElement.addEventListener(`submit`, sendForm);
    reset.addEventListener(`click`, function () {
      window.position.mapPinMainElement.style.top = MAIN_PIN_Y + `px`;
      window.position.mapPinMainElement.style.left = MAIN_PIN_X + `px`;
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
    });
  };

  const onFailFormSend = function () {
    document.body.appendChild(failMessage);
    document.addEventListener(`click`, formUnsendMessage);
    document.addEventListener(`keydown`, onPressEsc2);
    errorButton.addEventListener(`click`, formUnsendMessage);
  };

  const onSuccessFormSend = function () {

    window.position.mapPinMainElement.style.top = MAIN_PIN_Y + `px`;
    window.position.mapPinMainElement.style.left = MAIN_PIN_X + `px`;
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
    document.body.appendChild(successMessage);
    document.addEventListener(`click`, formSendMessage);
    document.addEventListener(`keydown`, onPressEsc);
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
