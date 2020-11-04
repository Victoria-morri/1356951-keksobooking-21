'use strict';

const livesType = window.utils.noticeElement.querySelector(`#type`);

window.utils.disable(window.utils.mapFieldsArray);
window.utils.disable(window.utils.formFieldsArray);

window.position.mapPinMainElement.addEventListener(`keydown`, window.form.onKeyEnterDown);
window.position.mapPinMainElement.addEventListener(`mousedown`, window.form.onMouseLeftButtonDown);
window.position.mapPinMainElement.addEventListener(`mousedown`, window.position.movePin);

window.formUtils.capacityElement.addEventListener(`input`, window.formUtils.onDependenceOfInputs);
window.formUtils.roomNumberElement.addEventListener(`input`, window.formUtils.onDependenceOfInputs);

window.formUtils.titleElement.addEventListener(`input`, window.formUtils.onCheckTitle);

window.formUtils.priceElement.addEventListener(`input`, window.formUtils.onSetPrice);

livesType.addEventListener(`change`, window.formUtils.onSetMinPrice);

window.position.startAdressInput();

window.formUtils.timein.addEventListener(`change`, window.formUtils.getTimeout);
window.formUtils.timeout.addEventListener(`change`, window.formUtils.getTimein);
