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

  const renderPins = function (arrayX) {
    const currentPins = arrayX.length > 5 ? arrayX.slice(0, 5) : arrayX;
    const pinsElements = document.querySelectorAll(`.map__pin`);
    for (let i = 0; i < pinsElements.length; i++) {
      if (!pinsElements[i].classList.contains(`map__pin--main`)) {
        pinsElements[i].remove();
      }
    }
    popupElements = document.querySelectorAll(`.map__card`);
    for (let i = 0; i < popupElements.length; i++) {
      popupElements[i].remove();
    }
    mapElement.appendChild(window.card.renderMapElementList(currentPins));
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < currentPins.length; i++) {
      fragment.appendChild(create(currentPins[i]));
    }
    mapPinsElement.appendChild(fragment);
    mapsPinsElements = document.querySelectorAll(`.map__pin`);
    popupElements = document.querySelectorAll(`.map__card`);
    window.popupCard.getInteractive(mapsPinsElements, popupElements);
  };

  const updateHousingType = function () {
    const sameTypeHousing = data.filter(function (dataOne) {
      return dataOne.offer.type === chosenHousingType;
    });
    renderPins(sameTypeHousing);
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
  const timein = noticeElement.querySelector(`#timein`);
  const timeout = noticeElement.querySelector(`#timeout`);
  const mapFilters = document.querySelector(`.map__filters`);
  const housingType = mapFilters.querySelector(`#housing-type`);
  const mapsFilters = mapFilters.querySelectorAll(`.map__filter`);
  const mapsFeatures = mapFilters.querySelector(`.map__features`);
  const inputs = mapsFeatures.querySelectorAll(`input`);
  let mapsPinsElements = document.querySelectorAll(`.map__pin`);
  let popupElements = document.querySelectorAll(`.map__card`);
  let chosenHousingType = `flat`;
  let data = [];

  const onSuccess = function (array) {
    data = array;
    updateHousingType();
    window.disable.unset(fieldsetArray);
    window.disable.unset(mapFiltersArray);
    fillAdressInput(window.position.PIN_WIDTH_HALF, window.position.PIN_HEIGHT);
    mapElement.classList.remove(`map--faded`);
    adFormElement.classList.remove(`ad-form--disabled`);
    mapElement.appendChild(window.card.renderMapElementList(array));
    const errorMessage = document.querySelector(`.error-message`);
    window.popupCard.error(errorMessage);
    window.popupCard.getInteractive(mapsPinsElements, popupElements);
    housingType.addEventListener(`change`, function (evt) {
      const type = evt.target.value;
      chosenHousingType = type;
      updateHousingType();
    });
    addListToCloseCard(mapsFilters);
    addListToCloseCard(inputs);
  };

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
