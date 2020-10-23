'use strict';
(function () {
  const mapElement = document.querySelector(`.map`);

  const setSite = function () {
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
  };

  window.reset = {
    mapElement,
    setSite
  };
})();
