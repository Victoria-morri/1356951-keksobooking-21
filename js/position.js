'use strict';

(function () {
  const PIN_WIDTH_HALF = 25;
  const PIN_HEIGHT = 70;
  const MAX_WIDTH = 1200;
  const MAX_HEIGHT = 630;
  const SKY_HEIGHT = 130;

  const getNumber = function (some) {
    const someNumber = some !== Number ? parseInt(some, 10) : some;
    return someNumber;
  };

  const fillAdressInput = function (width1, width2, height1, height2) {
    const width3 = getNumber(width1);
    const height3 = getNumber(height1);
    adressInputElement.value = `left: ${width3 + width2}px; top: ${height3 + height2}px`;
  };
  const getPosition = function (min, max, position) {
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

      startCords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      yPosition = getPosition(SKY_HEIGHT, MAX_HEIGHT, (mapPinMainElement.offsetTop - shift.y));
      xPosition = getPosition(-(PIN_WIDTH_HALF), MAX_WIDTH - (PIN_WIDTH_HALF * 2), (mapPinMainElement.offsetLeft - shift.x));

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
  };

  const mapPinMainElement = document.querySelector(`.map__pin--main`);
  const adressInputElement = document.querySelector((`#address`));

  window.position = {
    movePin,
    fillAdressInput,
    PIN_WIDTH_HALF,
    PIN_HEIGHT,
    MAX_WIDTH,
    MAX_HEIGHT,
    SKY_HEIGHT,
    mapPinMainElement
  };

}());
