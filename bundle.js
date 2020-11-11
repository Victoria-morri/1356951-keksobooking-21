/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!********************!*\
  !*** ./js/load.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const OK = 200;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

window.load = function ({onSuccess, onError, url, method, dataX}) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    let error = ``;

    switch (xhr.status) {
      case OK:
        onSuccess(xhr.response);
        break;
      case BAD_REQUEST:
        error = `Неверный запрос`;
        break;
      case UNAUTHORIZED:
        error = `Пользователь не авторизован`;
        break;
      case NOT_FOUND:
        error = `Ничего не найдено`;
        break;

      default:
        error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
    }
    if (error) {
      onError(error);
    }
  });

  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });
  xhr.open(method, url); // `GET`
  xhr.send(dataX);
};



})();

(() => {
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const getNumber = function (some) {
  return typeof some !== `number` ? parseInt(some, 10) : some;
};

const disable = function (arrayName) {
  for (let i = 0; i < arrayName.length; i++) {
    arrayName[i].setAttribute(`disabled`, `disabled`);
  }
};

const undisable = function (arrayName) {
  for (let i = 0; i < arrayName.length; i++) {
    arrayName[i].removeAttribute(`disabled`);
  }
};

const resetMap = function () {
  mapFiltersElement.reset();
  mapElement.classList.add(`map--faded`);
  disable(mapFieldsArray);
};

const resetForm = function () {
  adFormElement.reset();
  adFormElement.classList.add(`ad-form--disabled`);
  disable(formFieldsArray);
};

const activate = function (element1, classNeeded, array1) {
  element1.classList.remove(classNeeded);
  undisable(array1);
};

const noticeElement = document.querySelector(`.notice`);
const mapElement = document.querySelector(`.map`);
const adFormElement = noticeElement.querySelector(`.ad-form`);
const formFieldsetElements = adFormElement.querySelectorAll(`fieldset`);
const formSelectElements = adFormElement.querySelectorAll(`select`);
const mapFiltersElement = document.querySelector(`.map__filters`);
const mapFieldsetElements = mapFiltersElement.querySelectorAll(`fieldset`);
const mapSelectElements = mapFiltersElement.querySelectorAll(`select`);
const mapFieldsArray = Array.from(mapFieldsetElements).concat(Array.from(mapSelectElements));
const formFieldsArray = Array.from(formFieldsetElements).concat(Array.from(formSelectElements));

window.utils = {
  getNumber,
  disable,
  undisable,
  activate,
  resetMap,
  resetForm,
  mapElement,
  noticeElement,
  adFormElement,
  mapFiltersElement,
  mapFieldsArray,
  formFieldsArray
};



})();

(() => {
/*!************************!*\
  !*** ./js/position.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const PIN_WIDTH = 62;
const PIN_WIDTH_HALF = PIN_WIDTH / 2;
const PIN_HEIGHT = PIN_WIDTH + 22;
const MAX_WIDTH = 1200;
const MAX_HEIGHT = 630;
const SKY_HEIGHT = 130;
const MAIN_PIN_X = 570;
const MAIN_PIN_Y = 375;

const resetMainPin = function () {
  mapPinMainElement.style.top = MAIN_PIN_Y + `px`;
  mapPinMainElement.style.left = MAIN_PIN_X + `px`;
};

const startAdressInput = function () {
  const width3 = window.utils.getNumber(mapPinMainElement.style.left);
  const height3 = window.utils.getNumber(mapPinMainElement.style.top);
  adressInputElement.value = `${width3 + PIN_WIDTH_HALF}, ${height3 + PIN_WIDTH_HALF}`;
};

const fillAdressInput = function (width1, width2, height1, height2) {
  const width3 = window.utils.getNumber(width1);
  const height3 = window.utils.getNumber(height1);
  adressInputElement.value = `${width3 + width2}, ${height3 + height2}`;
};

const getPosition = function ({min, max, position}) {
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

    yPosition = getPosition({
      min: SKY_HEIGHT - PIN_HEIGHT,
      max: MAX_HEIGHT - PIN_HEIGHT,
      position: mapPinMainElement.offsetTop - shift.y
    });

    xPosition = getPosition({
      min: -PIN_WIDTH_HALF,
      max: MAX_WIDTH - PIN_WIDTH_HALF,
      position: mapPinMainElement.offsetLeft - shift.x
    });

    if (yPosition !== window.utils.getNumber(mapPinMainElement.style.top)) {
      startCords.y = moveEvt.clientY;
    }
    if (xPosition !== window.utils.getNumber(mapPinMainElement.style.left)) {
      startCords.x = moveEvt.clientX;
    }

    mapPinMainElement.style.top = yPosition + `px`;
    mapPinMainElement.style.left = xPosition + `px`;

    fillAdressInput(xPosition, PIN_WIDTH_HALF, yPosition, PIN_HEIGHT);
  };

  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    mapPinsMainElement.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
    fillAdressInput(xPosition, PIN_WIDTH_HALF, yPosition, PIN_HEIGHT);
  };

  mapPinsMainElement.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};

const mapPinMainElement = document.querySelector(`.map__pin--main`);
const mapPinsMainElement = document.querySelector(`.map__pins`);
const adressInputElement = document.querySelector(`#address`);

window.position = {
  startAdressInput,
  resetMainPin,
  movePin,
  mapPinMainElement
};

})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

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



})();

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

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

const getWordEnd = function (element) {
  let endOfWord = (element % 100) < 10 ? element % 100 : (element % 100) % 10;
  return endOfWord;
};

const create = function (option) {

  const mapCard = mapCardTemplate.cloneNode(true);
  if (option.author.avatar) {
    mapCard.querySelector(`.popup__avatar`).src = option.author.avatar;
  } else {
    mapCard.querySelector(`.popup__avatar`).hidden = true;
  }
  if (option.offer.title) {
    mapCard.querySelector(`.popup__title`).textContent = option.offer.title;
  } else {
    mapCard.querySelector(`.popup__title`).hidden = true;
  }
  if (option.offer.address) {
    mapCard.querySelector(`.popup__text--address`).textContent = option.offer.address;
  } else {
    mapCard.querySelector(`.popup__text--address`).hidden = true;
  }
  if (option.offer.price) {
    mapCard.querySelector(`.popup__text--price`).textContent = option.offer.price;
  } else {
    mapCard.querySelector(`.popup__text--price`).textContent = option.offer.price;
  }
  if (option.offer.type) {
    const chousenHousing = option.offer.type;
    mapCard.querySelector(`.popup__type`).textContent = housingType[chousenHousing];
  } else {
    mapCard.querySelector(`.popup__type`).hidden = true;
  }
  if (option.offer.rooms && option.offer.guests) {
    mapCard.querySelector(`.popup__text--capacity`).textContent = `${option.offer.rooms} комнат${wordEndRooms[getWordEnd(option.offer.rooms)]} для ${option.offer.guests} гост${wordEndGuests[getWordEnd(option.offer.guests)]}`;
  } else {
    mapCard.querySelector(`.popup__text--capacity`).hidden = true;
  }
  if (option.offer.checkin !== `` && option.offer.checkout !== ``) {
    mapCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${option.offer.checkin}, выезд до ${option.offer.checkout}`;
  } else {
    mapCard.querySelector(`.popup__text--time`).hidden = true;
  }
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
  if (option.offer.description) {
    mapCard.querySelector(`.popup__description`).textContent = option.offer.description;
  } else {
    mapCard.querySelector(`.popup__description`).hidden = true;
  }
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


})();

(() => {
/*!**************************!*\
  !*** ./js/popup-card.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const onCloseCard = function () {
  closeCard();
};

const closeCard = function () {
  if (activeCard) {
    activeCard.hidden = true;
    activePin.classList.remove(`map__pin--active`);
    document.removeEventListener(`keydown`, onPopupEscPress);
    closeCardButton.removeEventListener(`click`, onCloseCard);
    activeCard = null;
    activePin = null;
  }
};

const openPopupCard = function (card, pin) {
  activeCard = card;
  activePin = pin;
  card.hidden = false;
  activePin.classList.add(`map__pin--active`);
  document.addEventListener(`keydown`, onPopupEscPress);
  closeCardButton = activeCard.querySelector(`.popup__close`);
  closeCardButton.addEventListener(`click`, onCloseCard);
};

const onPopupEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    onCloseCard();
  }
};
const initInteractive = function (pins, cards) {
  for (let i = 1; i < pins.length; i++) {
    let currentPin = pins[i];
    let currentCard = cards[i - 1];
    currentPin.addEventListener(`click`, function () {
      closeCard();
      openPopupCard(currentCard, currentPin);
    });
  }
};

let closeCardButton;
let activePin;
let activeCard;

window.popupCard = {
  initInteractive,
  onCloseCard
};



})();

(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const DEBOUNCE_INTERVAL = 500;

window.debounce = function (cb) {
  let lastTimeout = null;
  return function (...rest) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      cb(...rest);
    }, DEBOUNCE_INTERVAL);
  };
};



})();

(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const PRICE = {
  low: 10000,
  high: 50000
};
const OFFER_QUANTITY = 5;
const mapFeatures = window.utils.mapFiltersElement.querySelector(`.map__features`);
const inputsmapFeatures = mapFeatures.querySelectorAll(`input`);
let offer = {
  type: `any`,
  price: `any`,
  rooms: `any`,
  guests: `any`,
  features: []
};

const resetOffer = function () {
  offer = {
    type: `any`,
    price: `any`,
    rooms: `any`,
    guests: `any`,
    features: []
  };
};
const changePriceOffer = function (evt) {
  offer.price = evt.target.value;
};

const changeRoomsOffer = function (evt) {
  offer.rooms = evt.target.value;
};

const changeHousingOffer = function (evt) {
  offer.type = evt.target.value;
};

const changeGuestsOffer = function (evt) {
  offer.guests = evt.target.value;
};

const changeMapFeatures = function () {
  offer.features = [];
  inputsmapFeatures.forEach(function (item) {
    if (item.checked) {
      offer.features.push(item.value);
    }
  });
};

const filterData = function (dataArray) {
  let result;
  let arrayToUse = dataArray.filter(function (item) {
    result = offer.type !== `any` ? item.offer.type === offer.type : true;
    if (result !== false) {
      if (offer.price !== `any`) {
        if (offer.price === `middle`) {
          result = item.offer.price <= PRICE.high && item.offer.price >= PRICE.low;
        } else if (offer.price === `low`) {
          result = item.offer.price < PRICE.low;
        } else if (offer.price === `high`) {
          result = item.offer.price > PRICE.high;
        }
      } else {
        result = true;
      }
    }

    if (result !== false) {
      result = offer.rooms !== `any` ? item.offer.rooms === window.utils.getNumber(offer.rooms) : true;
    }
    if (result !== false) {
      const guestsNumber = window.utils.getNumber(offer.guests);
      if (offer.guests !== `any`) {
        result = offer.guests !== `0` ? item.offer.guests >= guestsNumber : item.offer.guests === guestsNumber;
      }
    }
    if (result !== false) {
      for (let j = 0; j < offer.features.length; j++) {
        if ((item.offer.features.includes(offer.features[j])) === false) {
          return false;
        }
      }
    }
    return result;
  });
  arrayToUse = arrayToUse.length > OFFER_QUANTITY ? arrayToUse.slice(0, OFFER_QUANTITY) : arrayToUse;
  return arrayToUse;
};

window.filter = {
  changePriceOffer,
  changeRoomsOffer,
  changeHousingOffer,
  changeGuestsOffer,
  changeMapFeatures,
  filterData,
  resetOffer
};



})();

(() => {
/*!***********************!*\
  !*** ./js/message.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const hideErrorMessage = function () {
  if (errorMessageElement) {
    errorMessageElement.classList.add(`hidden`);
  }
};

const showServerMessage = function (message) {
  const error = document.createElement(`h2`);
  error.classList.add(`error-message`);
  error.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
  error.style.position = `absolute`;
  error.style.left = 0;
  error.style.right = 0;
  error.style.color = `white`;
  error.style.fontSize = `50px`;
  error.textContent = message;
  document.body.insertAdjacentElement(`afterbegin`, error);
};

const onRemoveFailMessage = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    onFormUnsendMessage();
  }
};

const onFormUnsendMessage = function () {
  document.body.removeChild(failMessage);
  document.removeEventListener(`click`, onFormUnsendMessage);
  document.removeEventListener(`keydown`, onRemoveFailMessage);
};

const onRemoveSuccessMessage = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    onFormSendMessage();
  }
};

const onFormSendMessage = function () {
  document.body.removeChild(successMessage);
  document.removeEventListener(`click`, onFormSendMessage);
  document.removeEventListener(`keydown`, onRemoveSuccessMessage);
};

const failElement = document.querySelector(`#error`).content.querySelector(`.error`);
const failMessage = failElement.cloneNode(true);
const errorButton = failMessage.querySelector(`.error__button`);
const successElement = document.querySelector(`#success`).content.querySelector(`.success`);
const successMessage = successElement.cloneNode(true);
const errorMessageElement = document.querySelector(`.error-message`);

const showError = function () {
  document.body.appendChild(failMessage);
  document.addEventListener(`click`, onFormUnsendMessage);
  document.addEventListener(`keydown`, onRemoveFailMessage);
  errorButton.addEventListener(`click`, onFormUnsendMessage);
};

const showSuccess = function () {
  document.body.appendChild(successMessage);
  document.addEventListener(`click`, onFormSendMessage);
  document.addEventListener(`keydown`, onRemoveSuccessMessage);
};

window.message = {
  showSuccess,
  showError,
  showServerMessage,
  hideErrorMessage
};



})();

(() => {
/*!****************************!*\
  !*** ./js/load-picture.js ***!
  \****************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const onAvatarAd = function () {
  let file = formFileField.files[0];
  let fileName = file.name.toLowerCase();

  let matches = FILE_TYPES.some(function (it) {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener(`load`, function () {
      formFilePreview.src = reader.result;
    });
    reader.readAsDataURL(file);
  }
};

const onPhotoAd = function () {
  const img = document.createElement(`img`);
  let photo = formPhotoField.files[0];
  let photoName = photo.name.toLowerCase();
  let matches = FILE_TYPES.some(function (it) {
    return photoName.endsWith(it);
  }
  );
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener(`load`, function () {
      img.src = reader.result;
      formPhotoPreview.appendChild(img);
    });
    reader.readAsDataURL(photo);
  }
};

const removePhotos = function () {
  const photos = window.loadPicture.formPhotoPreview.querySelectorAll(`img`);
  if (photos) {
    photos.forEach(function (it) {
      it.remove();
    });
  }
};

const formPhotoField = document.querySelector(`.ad-form__upload input[type=file]`);
const formPhotoPreview = document.querySelector(`.ad-form__photo`);
const formFileField = document.querySelector(`.ad-form__field input[type=file]`);
const formFilePreview = document.querySelector(`.ad-form-header__preview img`);

formPhotoField.addEventListener(`change`, onPhotoAd);
window.loadPicture = {
  onPhotoAd,
  onAvatarAd,
  removePhotos,
  formPhotoField,
  formFileField,
  formPhotoPreview,
  formFilePreview
};

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const DATA_URL = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_TO_SEND = `https://21.javascript.pages.academy/keksobooking`;

const activateMap = function () {
  removeListeners();
  window.utils.adFormElement.addEventListener(`submit`, onSendForm);
  resetElement.addEventListener(`click`, onResetForm);
  window.utils.activate(window.utils.mapElement, `map--faded`, window.utils. mapFieldsArray);
  window.utils.activate(window.utils.adFormElement, `ad-form--disabled`, window.utils.formFieldsArray);
  window.load({
    onSuccess,
    onError: window.message.showServerMessage,
    url: DATA_URL,
    method: `GET`,
    dataX: ``
  });
};

const removeListeners = function () {
  window.position.mapPinMainElement.removeEventListener(`keydown`, window.form.onKeyEnterDown);
  window.position.mapPinMainElement.removeEventListener(`mousedown`, window.form.onMouseLeftButtonDown);
};

const onMouseLeftButtonDown = function (evt) {
  if (evt.button === 0) {
    activateMap();
  }
};

const onKeyEnterDown = function (evt) {
  if (evt.key === `Enter`) {
    activateMap();
  }
};

const reset = function () {
  window.position.resetMainPin();
  window.utils.resetForm();
  window.position.startAdressInput();
  window.utils.resetMap();
  window.popupCard.onCloseCard();
  window.card.clearPinsCards();
  window.filter.resetOffer();
  window.loadPicture.removePhotos();
  window.loadPicture.formFilePreview.src = `img/muffin-grey.svg`;
  window.position.mapPinMainElement.addEventListener(`keydown`, onKeyEnterDown);
  window.position.mapPinMainElement.addEventListener(`mousedown`, onMouseLeftButtonDown);
};

const onResetForm = function (/* evt*/) {
  // evt.preventDefault();
  reset();
};

const renderPins = function (arrayForUse) {
  window.card.clearPinsCards();
  currentPins = window.pin.renderAll(arrayForUse);
  currentCards = window.card.renderAll(arrayForUse);
  window.utils.mapElement.appendChild(currentCards);
  mapPinsElement.appendChild(currentPins);
  mapsPinsElements = document.querySelectorAll(`.map__pin`);
  popupElements = document.querySelectorAll(`.map__card`);
  window.popupCard.initInteractive(mapsPinsElements, popupElements);
};

const onSendForm = function (evt) {
  evt.preventDefault();
  window.load({
    onSuccess: onSuccessFormSend,
    onError: onFailFormSend,
    url: URL_TO_SEND,
    method: `POST`,
    dataX: new FormData(window.utils.adFormElement)
  });
};

const onChange = window.debounce(function (evt) {
  window.popupCard.onCloseCard();
  const filterChangeHandler = filterChangeHandlerMap[evt.target.getAttribute(`name`)];
  filterChangeHandler(evt);
  updatePins();
});

const updatePins = function () {
  window.card.clearPinsCards();
  renderPins(window.filter.filterData(data));
};

const resetElement = window.utils.adFormElement.querySelector(`.ad-form__reset`);
const mapPinsElement = window.utils.mapElement.querySelector(`.map__pins`);
const filterChangeHandlerMap = {
  'housing-type': window.filter.changeHousingOffer,
  'housing-price': window.filter.changePriceOffer,
  'housing-rooms': window.filter.changeRoomsOffer,
  'housing-guests': window.filter.changeGuestsOffer,
  'features': window.filter.changeMapFeatures
};
let mapsPinsElements = document.querySelectorAll(`.map__pin`);
let popupElements = document.querySelectorAll(`.map__card`);
let data = [];
let currentCards;
let currentPins;

window.loadPicture.formFileField.addEventListener(`change`, window.loadPicture.onAvatarAd);
window.loadPicture.formPhotoField.addEventListener(`change`, window.loadPicture.onPhotoAd);

const onSuccess = function (array) {
  data = array;
  updatePins();
  window.message.hideErrorMessage();
  window.utils.mapFiltersElement.addEventListener(`change`, onChange);
};

const onFailFormSend = function () {
  window.message.showError();
};

const onSuccessFormSend = function () {
  onResetForm();
  window.message.showSuccess();
  window.utils.adFormElement.removeEventListener(`submit`, onSendForm);
  resetElement.removeEventListener(`click`, onResetForm);
};


window.form = {
  onMouseLeftButtonDown,
  onKeyEnterDown
};


})();

(() => {
/*!**************************!*\
  !*** ./js/form-utils.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const MAX_PRICE = 1000000;
const MIN_LETTER = 30;
const MAX_LETTER = 100;

const onCheckTitle = function () {
  const titleValueLength = titleElement.value.length;
  if (titleValueLength < MIN_LETTER) {
    titleElement.setCustomValidity(`Минамальное количество символов 30. Дополните заголовок.`);
  } else if (titleValueLength > MAX_LETTER) {
    titleElement.setCustomValidity(`Максимальное количество символов 100. Сократите заголовок.`);
  } else {
    titleElement.setCustomValidity(``);
  }
};

const onSetPrice = function () {
  setPrice();
};

const setPrice = function () {
  const priceValue = window.utils.getNumber(priceElement.value);
  if (priceValue > MAX_PRICE || priceValue < minPrice) {
    priceElement.setCustomValidity(`Цена может варьироваться от ${minPrice} до ${MAX_PRICE}руб. Скорректируйте цену.`);
  } else {
    priceElement.setCustomValidity(``);
  }
  priceElement.reportValidity();
};

const onSetMinPrice = function (evt) {
  const typeValue = evt.target.value;
  minPrice = housingTypesMinPrice[typeValue];
  priceElement.min = minPrice;
  priceElement.placeholder = minPrice;
  window.formUtils.setPrice();
};

const getTimeout = function () {
  timeout.value = timein.value;
};

const getTimein = function () {
  timein.value = timeout.value;
};

const onDependenceOfInputs = function () {
  const actualRoomNumber = window.utils.getNumber(roomNumberElement.value);
  const actualCapacity = window.utils.getNumber(capacityElement.value);
  if (actualRoomNumber < actualCapacity) {
    capacityElement.setCustomValidity(`Количество гостей должно соответствовать колличеству комнат. Уменьшите количество гостей.`);
  } else {
    capacityElement.setCustomValidity(``);
  }
};
const roomNumberElement = window.utils.noticeElement.querySelector(`#room_number`);
const capacityElement = window.utils.noticeElement.querySelector(`#capacity`);
const titleElement = window.utils.noticeElement.querySelector(`#title`);
const priceElement = window.utils.noticeElement.querySelector(`#price`);
const timein = window.utils.noticeElement.querySelector(`#timein`);
const timeout = window.utils.noticeElement.querySelector(`#timeout`);
const livesType = window.utils.noticeElement.querySelector(`#type`);

const housingTypesMinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
let minPrice = housingTypesMinPrice.flat;

window.formUtils = {
  onCheckTitle,
  onSetPrice,
  onSetMinPrice,
  getTimeout,
  getTimein,
  onDependenceOfInputs,
  priceElement,
  timein,
  timeout,
  titleElement,
  roomNumberElement,
  capacityElement,
  livesType
};


})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


window.utils.disable(window.utils.mapFieldsArray);
window.utils.disable(window.utils.formFieldsArray);
window.position.startAdressInput();
window.position.mapPinMainElement.addEventListener(`keydown`, window.form.onKeyEnterDown);
window.position.mapPinMainElement.addEventListener(`mousedown`, window.form.onMouseLeftButtonDown);
window.position.mapPinMainElement.addEventListener(`mousedown`, window.position.movePin);
window.formUtils.capacityElement.addEventListener(`input`, window.formUtils.onDependenceOfInputs);
window.formUtils.roomNumberElement.addEventListener(`input`, window.formUtils.onDependenceOfInputs);
window.formUtils.titleElement.addEventListener(`input`, window.formUtils.onCheckTitle);
window.formUtils.priceElement.addEventListener(`input`, window.formUtils.onSetPrice);
window.formUtils.livesType.addEventListener(`change`, window.formUtils.onSetMinPrice);
window.formUtils.timein.addEventListener(`change`, window.formUtils.getTimeout);
window.formUtils.timeout.addEventListener(`change`, window.formUtils.getTimein);

})();

/******/ })()
;