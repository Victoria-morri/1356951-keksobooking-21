'use strict';

const LIVES_TYPES_MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

const priceSet = function () {
  const priceValue = parseInt(priceElement.value, 10);
  if (priceValue > 1000000 || priceValue < minPrice) {
    priceElement.setCustomValidity(`Цена может варьироваться от ${minPrice} до 1000000руб. Скорректируйте цену.`);
  } else {
    priceElement.setCustomValidity(``);
  }
  priceElement.reportValidity();
};

const titleElement = window.form.noticeElement.querySelector(`#title`);
const priceElement = window.form.noticeElement.querySelector(`#price`);
const livesType = window.form.noticeElement.querySelector(`#type`);
const timein = window.form.noticeElement.querySelector(`#timein`);
const timeout = window.form.noticeElement.querySelector(`#timeout`);
let minPrice = 1000;


window.disable.set(window.form.fieldsetArray);
window.disable.set(window.form.mapFiltersArray);

window.form.mapPinMainElement.addEventListener(`keydown`, window.form.onKeyEnterDown);
window.form.mapPinMainElement.addEventListener(`mousedown`, window.form.onMouseLeftButtonDown);

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

priceElement.addEventListener(`input`, priceSet);

livesType.addEventListener(`change`, function (evt) {
  const typeValue = evt.target.value;
  minPrice = LIVES_TYPES_MIN_PRICE[typeValue];
  priceElement.placeholder = minPrice;
  priceSet();
});

window.form.fillAdressInput(window.position.PIN_WIDTH_HALF, window.position.PIN_HEIGHT / 2);

timein.addEventListener(`change`, function () {
  timeout.value = timein.value;
});
timeout.addEventListener(`change`, function () {
  timein.value = timeout.value;
});
