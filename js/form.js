'use strict';

(function () {

  const DATA_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const URL_TO_SEND = `https://21.javascript.pages.academy/keksobooking`;

  const activateMap = function () {
    removeListeners();
    window.utils.activate(window.utils.mapElement, `map--faded`, window.utils. mapFieldsArray);
    window.utils.activate(window.utils.adFormElement, `ad-form--disabled`, window.utils.formFieldsArray);
    window.load({
      onSuccess,
      onError: window.message.showServerMessage,
      url: DATA_URL,
      method: `GET`,
      dataX: ``
    });
  };

  const removeListeners = function () {
    window.position.mapPinMainElement.removeEventListener(`keydown`, window.form.onKeyEnterDown);
    window.position.mapPinMainElement.removeEventListener(`mousedown`, window.form.onMouseLeftButtonDown);
  };

  const onMouseLeftButtonDown = function (evt) {
    if (evt.button === 0) {
      activateMap();
    }
  };

  const onKeyEnterDown = function (evt) {
    if (evt.key === `Enter`) {
      activateMap();
    }
  };

  const reset = function () {
    window.position.resetMainPin();
    window.utils.resetForm();
    window.position.startAdressInput();
    window.utils.resetMap();
    window.popupCard.onCloseCard();
    window.card.clearPinsCards();
    window.position.mapPinMainElement.addEventListener(`keydown`, onKeyEnterDown);
    window.position.mapPinMainElement.addEventListener(`mousedown`, onMouseLeftButtonDown);
  };

  const onResetForm = function (evt) {
    if (evt) {
      evt.preventDefault();
    }
    reset();
  };

  const renderPins = function (arrayForUse) {
    window.card.clearPinsCards();
    currentPins = window.pin.renderAll(arrayForUse);
    currentCards = window.card.renderAll(arrayForUse);
    window.utils.mapElement.appendChild(currentCards);
    mapPinsElement.appendChild(currentPins);
    mapsPinsElements = document.querySelectorAll(`.map__pin`);
    popupElements = document.querySelectorAll(`.map__card`);
    window.popupCard.initInteractive(mapsPinsElements, popupElements);
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

  const onChange = window.debounce(function (evt) {
    window.popupCard.onCloseCard();
    const filterChangeHandler = filterChangeHandlerMap[evt.target.getAttribute(`name`)];
    filterChangeHandler(evt);
    updatePins();
  });

  const updatePins = function () {
    window.card.clearPinsCards();
    renderPins(window.filter.filterData(data));
  };

  const resetElement = window.utils.adFormElement.querySelector(`.ad-form__reset`);
  const mapPinsElement = window.utils.mapElement.querySelector(`.map__pins`);
  const filterChangeHandlerMap = {
    'housing-type': window.filter.changeHousingOffer,
    'housing-price': window.filter.changePriceOffer,
    'housing-rooms': window.filter.changeRoomsOffer,
    'housing-guests': window.filter.changeGuestsOffer,
    'features': window.filter.changeMapFeatures
  };
  let mapsPinsElements = document.querySelectorAll(`.map__pin`);
  let popupElements = document.querySelectorAll(`.map__card`);
  let data = [];
  let currentCards;
  let currentPins;

  const onSuccess = function (array) {
    data = array;
    updatePins();
    window.message.hideErrorMessage();
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


  window.form = {
    onMouseLeftButtonDown,
    onKeyEnterDown
  };
}());
