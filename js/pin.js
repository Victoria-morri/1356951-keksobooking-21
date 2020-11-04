'use strict';

(function () {

  const create = function (card) {
    const pinMap = mapPinElement.cloneNode(true);
    pinMap.style = `left: ${card.location.x}px; top: ${card.location.y}px`;
    pinMap.querySelector(`img`).src = card.author.avatar;
    pinMap.querySelector(`img`).alt = card.offer.title;
    return pinMap;
  };

  const renderMapPinsList = function (array, parent) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < array.length; i++) {
      fragment.appendChild(create(array[i]));
    }
    parent.appendChild(fragment);
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
    renderMapPinsList,
    clearAll,
    renderAll
  };


})();
