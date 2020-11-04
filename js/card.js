'use strict';

(function () {
  const FEATURES_LIST = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const wordEndRooms = {
    1: `а`,
    2: `ы`,
    3: `ы`,
    4: `ы`,
    5: ``,
    6: ``,
    7: ``,
    8: ``,
    9: ``,
    0: ``
  };

  const wordEndGuests = {
    1: `я`,
    2: `ей`,
    3: `ей`,
    4: `ей`,
    5: `ей`,
    6: `ей`,
    7: `ей`,
    8: `ей`,
    9: `ей`,
    0: `ей`
  };

  const housingType = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`};
  const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

  const create = function (option) {

    const mapCard = mapCardTemplate.cloneNode(true);
    mapCard.querySelector(`.popup__avatar`).src = option.author.avatar ? option.author.avatar : mapCard.querySelector(`.popup__avatar`).hidden = true;
    mapCard.querySelector(`.popup__title`).textContent = option.offer.title ? option.offer.title : mapCard.querySelector(`.popup__title`).hidden = true;
    mapCard.querySelector(`.popup__text--address`).textContent = option.offer.address ? option.offer.address : mapCard.querySelector(`.popup__text--address`).hidden = true;
    mapCard.querySelector(`.popup__text--price`).textContent = option.offer.price ? option.offer.price : mapCard.querySelector(`.popup__text--price`).hidden = true;
    if (option.offer.type) {
      const chousenHousing = option.offer.type;
      mapCard.querySelector(`.popup__type`).textContent = housingType[chousenHousing];
    } else {
      mapCard.querySelector(`.popup__type`).hidden = true;
    }
    const getWordEnd = function (element) {
      let endOfWord = (element % 100) < 10 ? element % 100 : (element % 100) % 10;
      return endOfWord;
    };
    // let endOfRoomsWord = (option.offer.rooms % 100) < 10 ? option.offer.rooms % 100 : (option.offer.rooms % 100) % 10;
    // let endOfGuestsWord = (option.offer.guests % 100) < 10 ? option.offer.guests % 100 : (option.offer.guests % 100) % 10;

    mapCard.querySelector(`.popup__text--capacity`).textContent = option.offer.rooms && option.offer.guests ? `${option.offer.rooms} комнат${wordEndRooms[getWordEnd(option.offer.rooms)]} для ${option.offer.guests} гост${wordEndGuests[getWordEnd(option.offer.guests)]}` : mapCard.querySelector(`.popup__text--capacity`).hidden = true;

    mapCard.querySelector(`.popup__text--time`).textContent = option.offer.checkin !== `0:00` && option.offer.checkout !== `0:00` ? `Заезд после ${option.offer.checkin}, выезд до ${option.offer.checkout}` : mapCard.querySelector(`.popup__text--time`).hidden = true;
    if (option.offer.features) {
      const festurePopup = mapCard.querySelector(`.popup__features`);
      const featureAr = option.offer.features;
      FEATURES_LIST.forEach(function (optionFeature) {
        if (!featureAr.includes(optionFeature)) {
          festurePopup.querySelector(`.popup__feature--${optionFeature}`).classList.add(`hidden`);
        }
      });
    } else {
      mapCard.querySelector(`.popup__features`).hidden = true;
    }

    mapCard.querySelector(`.popup__description`).textContent = option.offer.description ? option.offer.description : mapCard.querySelector(`.popup__description`).hidden = true;
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
    mapCard.hidden = true;

    return mapCard;
  };

  const renderAll = function (array) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < array.length; i++) {
      fragment.appendChild(create(array[i]));
    }
    return fragment;
  };

  const clearAll = function () {
    const cardsElements = document.querySelectorAll(`.map__card`);
    for (let i = 0; i < cardsElements.length; i++) {
      cardsElements[i].remove();
    }
  };

  const clearPinsCards = function () {
    window.pin.clearAll();
    clearAll();
  };

  window.card = {
    clearPinsCards,
    renderAll,
    clearAll
  };

}());

