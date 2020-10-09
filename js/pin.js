'use strict';

(function () {
  const createMapCardList = function () {
    const mapCardList = [];
    for (let i = 0; i < window.advertaisement.QUANTITY_ADVERTAISEMENTS; i++) {
      mapCardList.push(window.advertaisement.get());
    }
    return mapCardList;
  };

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

  const cardList = createMapCardList();
  const mapPinElement = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  window.pin = {
    renderMapPinsList,
    cardList,
    mapPinElement
  };


})();
