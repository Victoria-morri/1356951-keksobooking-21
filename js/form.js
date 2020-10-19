'use strict';

(function () {

  const fillAdressInput = function (width1, width2, height1, height2) {
    const width3 = width1 !== Number ? parseInt(width1, 10) : width1;
    const height3 = width1 !== Number ? parseInt(height1, 10) : height1;
    adressInputElement.value = `left: ${width3 + width2}px; top: ${height3 + height2}px`;
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
    mapFilters.addEventListener(`change`, window.popupCard.closeCard);
  };

  mapPinMainElement.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    let startCords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let xPosition = mapPinMainElement.offsetLeft;
    let yPosition = mapPinMainElement.offsetTop;

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      const shift = {
        x: startCords.x - moveEvt.clientX,
        y: startCords.y - moveEvt.clientY
      };

      startCords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY

      };
      if ((mapPinMainElement.offsetTop - shift.y) > 630) {
        yPosition = 630;
      } else if ((mapPinMainElement.offsetTop - shift.y) < 130) {
        yPosition = 130;
      } else {
        yPosition = mapPinMainElement.offsetTop - shift.y;
      }

      if ((mapPinMainElement.offsetLeft - shift.x) > 1160) {
        xPosition = 1160;
      } else if ((mapPinMainElement.offsetLeft - shift.x) < -(window.position.PIN_WIDTH_HALF)) {
        xPosition = -(window.position.PIN_WIDTH_HALF);
      } else {
        xPosition = mapPinMainElement.offsetLeft - shift.x;
      }

      mapPinMainElement.style.top = yPosition + `px`;
      mapPinMainElement.style.left = xPosition + `px`;

      fillAdressInput(xPosition, window.position.PIN_WIDTH_HALF, yPosition, window.position.PIN_HEIGHT);
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
      fillAdressInput(xPosition, window.position.PIN_WIDTH_HALF, yPosition, window.position.PIN_HEIGHT);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

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
