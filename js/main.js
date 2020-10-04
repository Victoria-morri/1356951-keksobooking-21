'use strict';
const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN_TIMES = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_TIMES = [`12:00`, `13:00`, `14:00`];
const FEATURES_LIST = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const FOTOS_LIST = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];
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
  return Math.floor(min + Math.random() * (max + 1 - min));
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
    let j = getRandomInteger(0, i);
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
  const result = array[getRandomInteger(0, array.length - 1)];
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
      photos: getRndArray(shuffle(FOTOS_LIST))
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  return advertaisement;
};

const fillAdressInput = function (width, height) {
  adressInputElement.value = `left: ${parseInt(mapPinMainElement.style.left, Number) + width}px; top: ${parseInt(mapPinMainElement.style.top, Number) + height}px`;
};

const setDisable = function () {

  for (let i = 0; i < fieldsetArray.length; i++) {
    fieldsetArray[i].setAttribute(`disabled`, `disabled`);
  }
  for (let i = 0; i < mapFiltersArray.length; i++) {
    mapFiltersArray[i].setAttribute(`disabled`, `disabled`);
  }
};

const unsetDisabled = function () {
  for (let i = 0; i < fieldsetArray.length; i++) {
    fieldsetArray[i].removeAttribute(`disabled`);
  }
  for (let i = 0; i < mapFiltersArray.length; i++) {
    mapFiltersArray[i].removeAttribute(`disabled`);
  }
  mapElement.classList.remove(`map--faded`);
  adFormElement.classList.remove(`ad-form--disabled`);
  mapPinsElement.appendChild(renderMapPinsList());
  mapElement.appendChild(renderMapElementList());
};

const activateMap = function () {
  unsetDisabled();
  fillAdressInput(PIN_WIDTH_HALF, PIN_HEIGHT);
};

const getMapcard = function (option) {
  const getDependence = function (offerX, valueX) {
    if (option.offer.type === offerX) {
      mapCard.querySelector(`.popup__type`).textContent = valueX;
    }
  };

  const mapCard = mapCardTemplate.cloneNode(true);
  mapCard.querySelector(`.popup__avatar`).src = option.author.avatar;
  mapCard.querySelector(`.popup__title`).textContent = option.offer.title;
  mapCard.querySelector(`.popup__text--address`).textContent = option.offer.address;
  mapCard.querySelector(`.popup__text--price`).textContent = option.offer.price;

  getDependence(`palace`, `Дворец`);
  getDependence(`flat`, `Квартира`);
  getDependence(`house`, `Дом`);
  getDependence(`bungalow`, `Бунгало`);
  /* почему то так не работает, eslint ругается
   mapCard.querySelector(`.popup__type`).textContent =
  (option.offer.type === `palace`) ? `Дворец`:
  (option.offer.type === `flat`) ? `Квартира`:
  (option.offer.type === `house`) ? `Дом`:
  (option.offer.type === `bungalow`) ? `Бунгало`:
  `Другое`;
*/
  mapCard.querySelector(`.popup__text--capacity`).textContent = `${option.offer.rooms} комнаты для ${option.offer.guests} гостей`;
  mapCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${option.offer.checkin}, выезд до ${option.offer.checkout}`;

  /* не работает такой вариант
  const featuresElements = mapCard.querySelector(`.popup__features`);
  option.offer.features.forEach(function (feature) {
    if (feature !== `wifi`) {
      featuresElements.querySelector(`.popup__feature--wifi`).remove();
    } else if (feature === `dishwasher`) {
      featuresElements.querySelector(`.popup__feature--dishwasher`).textContent = `dishwasher`;
    } else if (feature === `parking`) {
      featuresElements.querySelector(`.popup__feature--parking`).textContent = `parking`;
    } else if (feature === `washer`) {
      featuresElements.querySelector(`.popup__feature--washer`).textContent = `washer`;
    } else if (feature === `elevator`) {
      featuresElements.querySelector(`.popup__feature--elevator`).textContent = `elevator`;
    } else if (feature === `conditioner`) {
      featuresElements.querySelector(`.popup__feature--conditioner`).textContent = `conditioner`;
    } else {}

  });
*/

  /* еще один отличный не рабочий код)
   if (option.offer.features === 1) {
    mapCard.querySelector(`.popup__features`).textContent = option.offer.features;
  } else if (option.offer.features > 1) {
    for (let i = 0; i < option.offer.features.length; i++) {
      mapCard.querySelector(`.popup__features`).textContent = +`${option.offer.features[i]} <br \/>`;
    }
  } else {
    mapCard.querySelector(`.popup__features`).textContent = ``;
  }
*/
  // mapCard.querySelector(`.popup__features`).textContent = option.offer.features;
  mapCard.querySelector(`.popup__description`).textContent = option.offer.description;

  if (option.offer.photos.length === 0) {
    mapCard.querySelector(`.popup__photos`).remove();
  } else if (option.offer.photos.length === 1) {
    mapCard.querySelector(`.popup__photos`).querySelector(`img`).src = option.offer.photos;
  } else if (option.offer.photos.length > 1) {
    mapCard.querySelector(`.popup__photos`).querySelector(`img`).src = option.offer.photos[0];
    for (let i = 1; i < option.offer.photos.length; i++) {
      const newImg = document.createElement(`img`);
      newImg.classList.add(`popup__photo`);
      newImg.style.width = `45px`;
      newImg.style.height = `40px`;
      newImg.alt = `Фотография жилья`;
      newImg.src = option.offer.photos[i];
      mapCard.querySelector(`.popup__photos`).appendChild(newImg);
    }
  }

  return mapCard;
};

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


const renderMapPinsList = function () {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < QUANTITY_ADVERTAISEMENTS; i++) {
    fragment.appendChild(getPinMap(cardList[i]));
  }
  return fragment;
};

// Функции похожи, но одна пока без перебора, поэтому я совмещу их когда нужно будет и во второй функции их перебрать
const renderMapElementList = function () {
  const fragment = document.createDocumentFragment();
  // for (let i = 0; i < QUANTITY_ADVERTAISEMENTS; i++) {
  fragment.appendChild(getMapcard(cardList[0]));
  // }
  return fragment;
};


const dependenceOfInputs = function () {
  const actualRoomNumber = parseInt(roomNumberElement.value, 10);
  const actualCapacity = parseInt(capacityElement.value, 10);
  if (actualRoomNumber < actualCapacity) {
    capacityElement.setCustomValidity(`Количество гостей должно соответствовать колличеству комнат. Уменьшите количество гостей.`);
  } else {
    capacityElement.setCustomValidity(``);
  }
};

const onMouseLeftButtonDown = function (evt) {
  if (evt.button === 0) {
    activateMap();
    removeListeners();
  }
};

const onKeyEnterDown = function (evt) {
  if (evt.key === `Enter`) {
    activateMap();
    removeListeners();
  }
};

const removeListeners = function () {
  mapPinMainElement.removeEventListener(`keydown`, onKeyEnterDown);
  mapPinMainElement.removeEventListener(`mousedown`, onMouseLeftButtonDown);
};

const mapCardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const mapPinElement = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapElement = document.querySelector(`.map`);
const mapPinsElement = mapElement.querySelector(`.map__pins`);
const blockInputElements = document.querySelectorAll(`fieldset`);
const noticeElement = document.querySelector(`.notice`);
const adressInputElement = noticeElement.querySelector((`#address`));
const mapPinMainElement = document.querySelector(`.map__pin--main`);
const roomNumberElement = noticeElement.querySelector(`#room_number`);
const capacityElement = noticeElement.querySelector(`#capacity`);
const fieldsetArray = Array.from(blockInputElements);
const titleElement = noticeElement.querySelector(`#title`);
const priceElement = noticeElement.querySelector(`#price`);
const adFormElement = noticeElement.querySelector(`.ad-form`);
const mapFilterElements = document.querySelectorAll(`select`);
const mapFiltersArray = Array.from(mapFilterElements);

const cardList = createMapCardList();


mapPinMainElement.addEventListener(`keydown`, onKeyEnterDown);
mapPinMainElement.addEventListener(`mousedown`, onMouseLeftButtonDown);

capacityElement.addEventListener(`input`, function () {
  dependenceOfInputs();
});
roomNumberElement.addEventListener(`input`, function () {
  dependenceOfInputs();
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

setDisable();
fillAdressInput(PIN_WIDTH_HALF, PIN_HEIGHT / 2);

