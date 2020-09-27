'use strict';
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN_TIMES = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES_LIST = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const FOTOS_LIST = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const PIN_WIDTH_HALF = 25;
const PIN_HEIGHT = 70;
const SKY_HEIGHT = 120;
const QUANTITY_ADVERTAISMENTS = 8;

const MAP_PIN = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
// const MAP_CARD = document.querySelector(`#card`).content.querySelector(`.map__card`);

const MAP_ELEMENT = document.querySelector(`.map`);
MAP_ELEMENT.classList.remove(`map--faded`);
const mapPinsElement = MAP_ELEMENT.querySelector(`.map__pins`);

const getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRndArray = function (options) {
  const uniqFeatures = [];
  for (let i = 0; i < getRandomInteger(0, options.length); i++) {
    uniqFeatures.push(options[i]);
  }
  return uniqFeatures;
};

const shuffle = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getAvatarArray = function () {
  const avatarArray = [];
  for (let i = 1; i <= QUANTITY_ADVERTAISMENTS; i++) {
    avatarArray.push(i);
  }
  return avatarArray;
};

const avatarImgArray = shuffle(getAvatarArray());

const getAdvertaisment = function () {
  const advertaisment = {
    author: {
      avatar: `img/avatars/user0${avatarImgArray.pop()}.png`
    },
    offer: {
      title: `Отличный вид из окна`,
      address: `ул. Яблоневая д. 30`,
      price: 2000,
      type: TYPES[getRandomInteger(0, TYPES.length)],
      rooms: getRandomInteger(1, 4),
      guests: getRandomInteger(1, 5),
      checkin: CHECKIN_TIMES[getRandomInteger(0, CHECKIN_TIMES.length)],
      checkout: CHECKOUT_TIMES[getRandomInteger(0, CHECKOUT_TIMES.length)],
      features: getRndArray(shuffle(FEATURES_LIST)),
      description: `Немного воняет носками, но в целом нормально`,
      photos: getRndArray(FOTOS_LIST)
    },
    location: {
      x: getRandomInteger(PIN_WIDTH_HALF, 1200) - PIN_WIDTH_HALF,
      y: getRandomInteger(PIN_HEIGHT + SKY_HEIGHT, 630) - PIN_HEIGHT
    }
  };
  return advertaisment;
};

/* const getMapcard = function (option) {
  const mapCard = MAP_CARD.cloneNode(true);
  mapCard.querySelector(`.popup__avatar`).src = option.author.avatar;
  mapCard.querySelector(`.popup__title`).textContent = option.offer.title;
  mapCard.querySelector(`.popup__text--address`).textContent = option.offer.address;
  mapCard.querySelector(`.popup__text--price`).textContent = option.offer.price;
  mapCard.querySelector(`.popup__type`).textContent = option.offer.type;
  mapCard.querySelector(`.popup__text--capacity`).textContent = `${option.offer.rooms} комнаты для ${option.offer.guests} гостей`;
  mapCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${option.offer.checkin}, выезд до ${option.offer.checkout}`;
  mapCard.querySelector(`.popup__features`).textContent = option.offer.features;
  mapCard.querySelector(`.popup__description`).textContent = option.offer.description;
  mapCard.querySelector(`.popup__photos`).querySelector(`img`).src = option.offer.photos[0];
  return mapCard;
};
*/
const createMapCardList = function () {
  const mapCardList = [];
  for (let i = 0; i < QUANTITY_ADVERTAISMENTS; i++) {
    mapCardList.push(getAdvertaisment());
  }
  return mapCardList;
};

const cardList = createMapCardList();

const getPinMap = function (card) {
  const PinMap = MAP_PIN.cloneNode(true);
  PinMap.style = `left: ${card.location.x}px; top: ${card.location.y}px`;
  PinMap.querySelector(`img`).src = card.author.avatar;
  PinMap.querySelector(`img`).alt = card.offer.title;
  return PinMap;
};

const renderMapPinsList = function () {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < QUANTITY_ADVERTAISMENTS; i++) {
    fragment.appendChild(getPinMap(cardList[i]));
  // fragment.appendChild(getMapcard(cardList[i]));
  }
  return fragment;
};
mapPinsElement.appendChild(renderMapPinsList());
