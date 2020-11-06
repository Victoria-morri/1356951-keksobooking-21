'use strict';
const PIN_WIDTH_HALF = 25;
const PIN_HEIGHT = 70;

const create = function (card) {
  const pinMap = mapPinElement.cloneNode(true);
  pinMap.style = `left: ${card.location.x - PIN_WIDTH_HALF}px; top: ${card.location.y - PIN_HEIGHT}px`;
  pinMap.querySelector(`img`).src = card.author.avatar;
  pinMap.querySelector(`img`).alt = card.offer.title;
  return pinMap;
};

const clearAll = function () {
  const pinsElements = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  for (let i = 0; i < pinsElements.length; i++) {
    pinsElements[i].remove();
  }
};

const renderAll = function (array) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < array.length; i++) {
    fragment.appendChild(create(array[i]));
  }
  return fragment;
};

const mapPinElement = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

window.pin = {
  clearAll,
  renderAll
};


