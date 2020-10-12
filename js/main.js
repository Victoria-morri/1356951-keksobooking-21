'use strict';

// const popupClose = window.card.mapCardTemplate.querySelector(`.popup__close`);


const titleElement = window.form.noticeElement.querySelector(`#title`);
const priceElement = window.form.noticeElement.querySelector(`#price`);

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
/*
const livesType = window.form.noticeElement.querySelector(`#type`);

const livesTypesMinPrise = {
  bungalow: `0`,
  flat: `1000`,
  house: `5000`,
  palace: `10000`

};

livesType.addEventListener(`change`, function (evt) {
  const typeValue = evt.target.value;
  const minPrice = livesTypesMinPrise[typeValue];
  let priceValue = priceElement.value;
  if (priceValue < minPrice) {
    priceValue = minPrice;
  }
  priceElement.addEventListener(`input`, function () {

    if (priceValue > 1000000 || priceValue < minPrice) {
      priceElement.setCustomValidity(`Цена может варьироваться от ${minPrice} до 1000000руб. Скорректируйте цену.`);
    } else {
      priceElement.setCustomValidity(``);
    }
  });
}
);*/

priceElement.addEventListener(`input`, function () {
  const priceValue = priceElement.value;
  if (priceValue > 1000000 || priceValue < 1000) {
    priceElement.setCustomValidity(`Цена может варьироваться от 1000 до 1000000руб. Скорректируйте цену.`);
  } else {
    priceElement.setCustomValidity(``);
  }
});

window.form.fillAdressInput(window.position.PIN_WIDTH_HALF, window.position.PIN_HEIGHT / 2);

