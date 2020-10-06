'use strict';

(function () {

  const dependenceOfInputs = function () {
    const actualRoomNumber = parseInt(roomNumberElement.value, 10);
    const actualCapacity = parseInt(capacityElement.value, 10);
    if (actualRoomNumber < actualCapacity) {
      capacityElement.setCustomValidity(`Количество гостей должно соответствовать колличеству комнат. Уменьшите количество гостей.`);
    } else {
      capacityElement.setCustomValidity(``);
    }
  };

  const noticeElement = document.querySelector(`.notice`);
  const roomNumberElement = noticeElement.querySelector(`#room_number`);
  const capacityElement = noticeElement.querySelector(`#capacity`);
  const titleElement = noticeElement.querySelector(`#title`);
  const priceElement = noticeElement.querySelector(`#price`);

  capacityElement.addEventListener(`input`, function () {
    window.form.dependenceOfInputs();
  });
  roomNumberElement.addEventListener(`input`, function () {
    window.form.dependenceOfInputs();
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

  window.form = {
    dependenceOfInputs,
    noticeElement
  };
}());
