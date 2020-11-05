'use strict';

(function () {
  const PIN_WIDTH = 62;
  const PIN_WIDTH_HALF = PIN_WIDTH / 2;
  const PIN_HEIGHT = PIN_WIDTH + 22;
  const MAX_WIDTH = 1200;
  const MAX_HEIGHT = 630;
  const SKY_HEIGHT = 130;
  const MAIN_PIN_X = 570;
  const MAIN_PIN_Y = 375;

  const resetMainPin = function () {
    mapPinMainElement.style.top = MAIN_PIN_Y + `px`;
    mapPinMainElement.style.left = MAIN_PIN_X + `px`;
  };

  const startAdressInput = function () {
    const width3 = window.utils.getNumber(mapPinMainElement.style.left);
    const height3 = window.utils.getNumber(mapPinMainElement.style.top);
    adressInputElement.value = `left: ${width3 + PIN_WIDTH_HALF}px; top: ${height3 + PIN_WIDTH_HALF}px`;
  };

  const fillAdressInput = function (width1, width2, height1, height2) {
    const width3 = window.utils.getNumber(width1);
    const height3 = window.utils.getNumber(height1);
    adressInputElement.value = `left: ${width3 + width2}px; top: ${height3 + height2}px`;
  };

  const getPosition = function ({min, max, position}) {
    let actualPosition;
    if (position > max) {
      actualPosition = max;
    } else if (position < min) {
      actualPosition = min;
    } else {
      actualPosition = position;
    }
    return actualPosition;
  };

  const movePin = function (evt) {
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

      yPosition = getPosition({
        min: SKY_HEIGHT - PIN_HEIGHT,
        max: MAX_HEIGHT - PIN_HEIGHT,
        position: mapPinMainElement.offsetTop - shift.y
      });

      xPosition = getPosition({
        min: -PIN_WIDTH_HALF,
        max: MAX_WIDTH - PIN_WIDTH_HALF,
        position: mapPinMainElement.offsetLeft - shift.x
      });

      if (yPosition !== window.utils.getNumber(mapPinMainElement.style.top)) {
        startCords.y = moveEvt.clientY;
      }
      if (xPosition !== window.utils.getNumber(mapPinMainElement.style.left)) {
        startCords.x = moveEvt.clientX;
      }

      mapPinMainElement.style.top = yPosition + `px`;
      mapPinMainElement.style.left = xPosition + `px`;

      fillAdressInput(xPosition, PIN_WIDTH_HALF, yPosition, PIN_HEIGHT);
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      mapPinsMainElement.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
      fillAdressInput(xPosition, PIN_WIDTH_HALF, yPosition, PIN_HEIGHT);
    };

    mapPinsMainElement.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  const mapPinMainElement = document.querySelector(`.map__pin--main`);
  const mapPinsMainElement = document.querySelector(`.map__pins`);
  const adressInputElement = document.querySelector(`#address`);

  window.position = {
    startAdressInput,
    resetMainPin,
    movePin,
    mapPinMainElement
  };

}());
