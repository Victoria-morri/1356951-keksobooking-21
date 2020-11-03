'use strict';

const MAX_PRICE = 1000000;

const setPrice = function () {
  const priceValue = parseInt(priceElement.value, 10);
  if (priceValue > MAX_PRICE || priceValue < minPrice) {
    priceElement.setCustomValidity(`Цена может варьироваться от ${minPrice} до ${MAX_PRICE}руб. Скорректируйте цену.`);
  } else {
    priceElement.setCustomValidity(``);
  }
  priceElement.reportValidity();
};

const titleElement = window.utils.noticeElement.querySelector(`#title`);
const priceElement = window.utils.noticeElement.querySelector(`#price`);
const livesType = window.utils.noticeElement.querySelector(`#type`);
const housingTypesMinPrice = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

let minPrice = 1000;

window.utils.disable(window.utils.mapFieldsArray);
window.utils.disable(window.utils.formFieldsArray);

window.position.mapPinMainElement.addEventListener(`keydown`, window.form.onKeyEnterDown);
window.position.mapPinMainElement.addEventListener(`mousedown`, window.form.onMouseLeftButtonDown);

window.form.capacityElement.addEventListener(`input`, window.form.dependenceOfInputs);
window.form.roomNumberElement.addEventListener(`input`, window.form.dependenceOfInputs);

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

priceElement.addEventListener(`input`, setPrice);

livesType.addEventListener(`change`, function (evt) {
  const typeValue = evt.target.value;
  minPrice = housingTypesMinPrice[typeValue];
  priceElement.min = minPrice;
  priceElement.placeholder = minPrice;
  setPrice();
});

window.position.fillAdressInput(window.position.mapPinMainElement.style.left, window.position.PIN_WIDTH_HALF, window.position.mapPinMainElement.style.top, window.position.PIN_HEIGHT / 2);

window.filter.timein.addEventListener(`change`, window.filter.getTimeout);
window.filter.timeout.addEventListener(`change`, window.filter.getTimein);
