'use strict';

(function () {
  const HOUSING_TYPE = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`};

  const create = function (option) {

    const mapCard = mapCardTemplate.cloneNode(true);
    mapCard.querySelector(`.popup__avatar`).src = option.author.avatar;
    mapCard.querySelector(`.popup__title`).textContent = option.offer.title;
    mapCard.querySelector(`.popup__text--address`).textContent = option.offer.address;
    mapCard.querySelector(`.popup__text--price`).textContent = option.offer.price;

    const chousenHousing = option.offer.type;
    mapCard.querySelector(`.popup__type`).textContent = HOUSING_TYPE[chousenHousing];
    mapCard.querySelector(`.popup__text--capacity`).textContent = `${option.offer.rooms} комнаты для ${option.offer.guests} гостей`;
    mapCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${option.offer.checkin}, выезд до ${option.offer.checkout}`;

    const festurePopup = mapCard.querySelector(`.popup__features`);
    const featureAr = option.offer.features;
    window.advertaisement.FEATURES_LIST.forEach(function (optionFeature) {
      if (!featureAr.includes(optionFeature)) {
        festurePopup.querySelector(`.popup__feature--${optionFeature}`).classList.add(`hidden`);
      }
    });

    mapCard.querySelector(`.popup__description`).textContent = option.offer.description;
    const imgCardMap = mapCard.querySelector(`.popup__photos`);
    if (option.offer.photos.length === 0) {
      imgCardMap.remove();
    } else if (option.offer.photos.length === 1) {
      imgCardMap.querySelector(`img`).src = option.offer.photos;
    } else if (option.offer.photos.length > 1) {
      imgCardMap.querySelector(`img`).src = option.offer.photos[0];
      for (let i = 1; i < option.offer.photos.length; i++) {
        const newImg = imgCardMap.querySelector(`img`).cloneNode(true);
        newImg.src = option.offer.photos[i];
        imgCardMap.appendChild(newImg);
      }
    }

    return mapCard;
  };

  // Функции похожи, (renderMapPinsList) но одна пока без перебора, поэтому я совмещу их когда нужно будет и во второй функции их перебрать
  const renderAll = function (array) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < array.length; i++) {
      let card;
      card = create(array[i]);
      card.hidden = true;
      fragment.appendChild(card);
    }
    return fragment;
  };

  const clearAll = function (popupElements) {
    if (popupElements) {
      for (let i = 0; i < popupElements.length; i++) {
        popupElements[i].hidden = true;
      }
    }
  };

  const clearPinsCards = function (array) {
    window.pin.clearAll();
    window.card.clearAll(array);
  };

  const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  window.card = {
    clearPinsCards,
    renderAll,
    clearAll
  };

}());

