'use strict';
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN_TIMES = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES_LIST = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const FOTOS_LIST = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const TITLES = [`Отличный вид из окна`, `Метро в 5 минутах ходьбы`, `В доме есть вкусная пекарня`, `Соседи драчуны`, `Есть подземный паркинг`];
const PRICES = [`5000`, `8500`, `6200`, `3400`, `1500`, `1750`, `2100`];
const DESCRIPTIONS = [`Немного воняет носками, но в целом нормально`, `Можно выспаться`, `Есть аквариум - без рыб, почистите как раз`, `Можно лежать на печи, она теплая`];

const PIN_WIDTH_HALF = 25;
const PIN_HEIGHT = 70;
const SKY_HEIGHT = 120;
const QUANTITY_ADVERTAISEMENTS = 8;
const MIN_GUEST = 1;
const MAX_GUEST = 5;
const MIN_ROOM = 1;
const MAX_ROOM = 4;
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 630;


const getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRndArray = function (options) {
  const uniqFeatures = [];
  const rndInteger = getRandomInteger(0, options.length);
  for (let i = 0; i < rndInteger; i++) {
    uniqFeatures.push(options[i]);
  }
  return uniqFeatures;
};

const shuffle = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = getRandomInteger(0, i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getAvatarArray = function () {
  const avatarArray = [];
  for (let i = 1; i <= QUANTITY_ADVERTAISEMENTS; i++) {
    avatarArray.push(i);
  }
  return avatarArray;
};

const avatarImgArray = shuffle(getAvatarArray());
const getRndI = function (array) {
  const result = array[getRandomInteger(0, array.length)];
  return result;
};

const getAdvertaisement = function () {
  const locationX = getRandomInteger(PIN_WIDTH_HALF, MAX_WIDTH) - PIN_WIDTH_HALF;
  const locationY = getRandomInteger(PIN_HEIGHT + SKY_HEIGHT, MAX_HEIGHT) - PIN_HEIGHT;

  const advertaisement = {
    author: {
      avatar: `img/avatars/user0${avatarImgArray.pop()}.png`
    },
    offer: {
      title: getRndI(TITLES),
      address: `${locationX}, ${locationY}`,
      price: getRndI(PRICES),
      type: getRndI(TYPES),
      rooms: getRandomInteger(MIN_ROOM, MAX_ROOM),
      guests: getRandomInteger(MIN_GUEST, MAX_GUEST),
      checkin: getRndI(CHECKIN_TIMES),
      checkout: getRndI(CHECKOUT_TIMES),
      features: getRndArray(shuffle(FEATURES_LIST)),
      description: getRndI(DESCRIPTIONS),
      photos: getRndArray(FOTOS_LIST)
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return advertaisement;
};

// второе задание

const fillAdressInput = function (width, height) {
  adressInputElement.value = `left: ${parseInt(mapPinMainElement.style.left, Number) + width}px; top: ${parseInt(mapPinMainElement.style.top, Number) + height}px`;
};

const checkDisable = function () {

  for (let i = 0; i < fieldsetArray.length; i++) {
    fieldsetArray[i].setAttribute(`disabled`, `disabled`);
  }
  mapFilters.setAttribute(`disabled`, `disabled`);
  // также пыталась добавить в разметке прям, но не работает,
  // также пыталась добавить класс map__filters--disabled, но тоже бесполезно
};

const uncheckDisabled = function () {
  for (let i = 0; i < fieldsetArray.length; i++) {
    fieldsetArray[i].removeAttribute(`disabled`);
    mapElement.classList.remove(`map--faded`);
    adFormElement.classList.remove(`ad-form--disabled`);
    mapPinsElement.appendChild(renderMapPinsList());
  }
};

/* const removeMapFaded = function () {
  mapElement.classList.remove(`map--faded`);
};
*/
const activateMap = function () {
  // removeMapFaded();
  uncheckDisabled();
  fillAdressInput(PIN_WIDTH_HALF, PIN_HEIGHT);
};
/* const getMapcard = function (option) {
  const mapCard = mapCardTemplate.cloneNode(true);
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
const getPinMap = function (card) {
  const pinMap = mapPinElement.cloneNode(true);
  pinMap.style = `left: ${card.location.x}px; top: ${card.location.y}px`;
  pinMap.querySelector(`img`).src = card.author.avatar;
  pinMap.querySelector(`img`).alt = card.offer.title;
  return pinMap;
};

const createMapCardList = function () {
  const mapCardList = [];
  for (let i = 0; i < QUANTITY_ADVERTAISEMENTS; i++) {
    mapCardList.push(getAdvertaisement());
  }
  return mapCardList;
};

const mapPinElement = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
// const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapElement = document.querySelector(`.map`);
const mapPinsElement = mapElement.querySelector(`.map__pins`);
const blockInputElements = document.querySelectorAll(`fieldset`);
const noticeElement = document.querySelector(`.notice`);
const adressInputElement = noticeElement.querySelector((`input[id=address]`));
const mapPinMainElement = document.querySelector(`.map__pin--main`);
const roomNumberElement = noticeElement.querySelector(`#room_number`);
const capacityElement = noticeElement.querySelector(`#capacity`);
const fieldsetArray = Array.from(blockInputElements);
const titleElement = noticeElement.querySelector(`#title`);
const priceElement = noticeElement.querySelector(`#price`);
const adFormElement = noticeElement.querySelector(`.ad-form`);
const mapFilters = document.querySelector(`.map__filters`);

const cardList = createMapCardList();

const renderMapPinsList = function () {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < QUANTITY_ADVERTAISEMENTS; i++) {
    fragment.appendChild(getPinMap(cardList[i]));
  // fragment.appendChild(getMapcard(cardList[i]));
  }
  return fragment;
};
const onActiveSite = function (evt) {
  if (evt.key === `Enter` || evt.button === 0) {
    removeListeners();
  }
};

const removeListeners = function () {
  document.removeEventListener(`keydown`, onActiveSite);
  document.removeEventListener(`mousedown`, onActiveSite);
};

mapPinMainElement.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    activateMap();
    removeListeners();
  }
});

mapPinMainElement.addEventListener(`keydown`, function (evt) {
  if (evt.key === `Enter`) {
    activateMap();
    removeListeners();
  }
});
capacityElement.addEventListener(`input`, function () {
  const actualRoomNumber = parseInt(roomNumberElement.value, Number);
  const actualCapacity = parseInt(capacityElement.value, Number);
  if (actualRoomNumber < actualCapacity || actualRoomNumber !== actualCapacity) {
    capacityElement.setCustomValidity(`Количество гостей должно соответствовать колличеству комнат. Уменьшите количество гостей.`);
  } else {
    capacityElement.setCustomValidity(``);
  }
});

titleElement.addEventListener(`input`, function () {
  const titleValueLength = titleElement.value.length;
  if (titleValueLength < 30) {
    titleElement.setCustomValidity(`Минамальное количество символов 30. Дополните заголовок.`);
  } else if (titleValueLength > 100) {
    titleElement.setCustomValidity(`Максимальное количество символов 100. Сократите заголовок.`);
  } else {
    titleElement.setCustomValidity(``);
  }
});

priceElement.addEventListener(`input`, function () {
  const priceValue = priceElement.value;
  if (priceValue > 1000000 || priceValue < 1000) {
    priceElement.setCustomValidity(`Цена может варьироваться от 1000 до 1000000руб. Скорректируйте цену.`);
  } else {
    priceElement.setCustomValidity(``);
  }
});

checkDisable();
fillAdressInput(PIN_WIDTH_HALF, PIN_HEIGHT / 2);
