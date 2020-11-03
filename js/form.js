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
    window.utils.resetForm();
    window.position.fillAdressInput(window.position.mapPinMainElement.style.left, window.position.PIN_WIDTH_HALF, window.position.mapPinMainElement.style.top, window.position.PIN_HEIGHT / 2);
    window.utils.resetMap();
    window.popupCard.onCloseCard();
    window.card.clearPinsCards();
    window.position.mapPinMainElement.addEventListener(`keydown`, onKeyEnterDown);
    window.position.mapPinMainElement.addEventListener(`mousedown`, onMouseLeftButtonDown);
  };

  const renderPins = function (arrayX) {
    const arrayForUse = arrayX.length > 5 ? arrayX.slice(0, 5) : arrayX;
    window.card.clearPinsCards();
    currentPins = window.pin.renderAll(arrayForUse);
    currentCards = window.card.renderAll(arrayForUse);
    window.utils.mapElement.appendChild(currentCards);
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
      dataX: new FormData(window.utils.adFormElement)
    });
  };

  const changePriceOffer = function (evt) {
    offer.price = evt.target.value;
    updatePins();
  };

  const changeRoomsOffer = function (evt) {
    offer.rooms = evt.target.value;
    updatePins();
  };

  const changeHousingOffer = function (evt) {
    offer.type = evt.target.value;
    updatePins();
  };

  const changeGuestsOffer = function (evt) {
    offer.guests = evt.target.value;
    updatePins();
  };

  const changeMapFeatures = function () {
    offer.features = [];
    inputsmapFeatures.forEach(function (item) {
      if (item.checked) {
        offer.features.push(item.value);
      }
    });
    updatePins();
  };

  const onChange = window.debounce(function (evt) {
    window.popupCard.onCloseCard();
    const filterChangeHandler = filterChangeHandlerMap[evt.target.getAttribute(`name`)];
    filterChangeHandler(evt);
  });

  const updatePins = function () {
    window.card.clearPinsCards();
    renderPins(window.filter.filterData(data, offer));
  };

  const resetElement = window.utils.adFormElement.querySelector(`.ad-form__reset`);
  const mapPinsElement = window.utils.mapElement.querySelector(`.map__pins`);
  const roomNumberElement = window.utils.noticeElement.querySelector(`#room_number`);
  const capacityElement = window.utils.noticeElement.querySelector(`#capacity`);
  const mapFeatures = window.utils.mapFiltersElement.querySelector(`.map__features`);
  const inputsmapFeatures = mapFeatures.querySelectorAll(`input`);
  const filterChangeHandlerMap = {
    'housing-type': changeHousingOffer,
    'housing-price': changePriceOffer,
    'housing-rooms': changeRoomsOffer,
    'housing-guests': changeGuestsOffer,
    'features': changeMapFeatures
  };
  let mapsPinsElements = document.querySelectorAll(`.map__pin`);
  let popupElements = document.querySelectorAll(`.map__card`);
  let data = [];
  let currentCards;
  let currentPins;
  let offer = {
    type: `any`,
    price: `any`,
    rooms: `any`,
    guests: `any`,
    features: []
  };

  const onSuccess = function (array) {
    data = array;
    updatePins();
    window.utils.activate(window.utils.mapElement, `map--faded`, window.utils. mapFieldsArray);
    window.utils.activate(window.utils.adFormElement, `ad-form--disabled`, window.utils.formFieldsArray);
    const errorMessageElement = document.querySelector(`.error-message`);
    window.popupCard.error(errorMessageElement);
    window.utils.mapFiltersElement.addEventListener(`change`, onChange);
    window.utils.adFormElement.addEventListener(`submit`, onSendForm);
    resetElement.addEventListener(`click`, onResetForm);
  };

  const onFailFormSend = function () {
    window.message.showError();
  };

  const onSuccessFormSend = function () {
    onResetForm();
    window.message.showSuccess();
    window.utils.adFormElement.removeEventListener(`submit`, onSendForm);
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
