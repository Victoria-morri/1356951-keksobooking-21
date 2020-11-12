'use strict';
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
  setPrice();
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

