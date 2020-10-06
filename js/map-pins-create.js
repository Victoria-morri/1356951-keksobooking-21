'use strict';

(function () {
  const createMapCardList = function () {
    const mapCardList = [];
    for (let i = 0; i < window.rndFunction.QUANTITY_ADVERTAISEMENTS; i++) {
      mapCardList.push(window.advertaisementCreate.getAdvertaisement());
    }
    return mapCardList;
  };

  const getPinMap = function (card) {
    const pinMap = mapPinElement.cloneNode(true);
    pinMap.style = `left: ${card.location.x}px; top: ${card.location.y}px`;
    pinMap.querySelector(`img`).src = card.author.avatar;
    pinMap.querySelector(`img`).alt = card.offer.title;
    return pinMap;
  };

  const renderMapPinsList = function () {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < window.rndFunction.QUANTITY_ADVERTAISEMENTS; i++) {
      fragment.appendChild(getPinMap(cardList[i]));
    }
    return fragment;
  };

  // Функции похожи, но одна пока без перебора, поэтому я совмещу их когда нужно будет и во второй функции их перебрать
  const renderMapElementList = function () {
    const fragment = document.createDocumentFragment();
    // for (let i = 0; i < QUANTITY_ADVERTAISEMENTS; i++) {
    fragment.appendChild(window.mapCardCreate.getMapcard(window.mapPinsCreate.cardList[0]));
    // }
    return fragment;
  };

  const cardList = createMapCardList();
  const mapPinElement = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  window.mapPinsCreate = {
    renderMapPinsList,
    getPinMap,
    renderMapElementList,
    cardList
  };


})();
