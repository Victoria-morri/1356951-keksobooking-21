'use strict';
(function () {

  const set = function (arrayName) {
    for (let i = 0; i < arrayName.length; i++) {
      arrayName[i].setAttribute(`disabled`, `disabled`);
    }
  };

  const unset = function (arrayName) {
    for (let i = 0; i < arrayName.length; i++) {
      arrayName[i].removeAttribute(`disabled`);
    }
  };

  /* const resetForm = function () {
    formElement.reset();
    formElement.classList.add(`ad-form--disabled`);
    set(formSelectFieldsetArray);
    window.position.fillAdressInput(window.position.mapPinMainElement.style.left, window.position.PIN_WIDTH_HALF, window.position.mapPinMainElement.style.top, window.position.PIN_HEIGHT / 2);

  };

  const formElement = document.querySelector(`.ad-form`);
  const formFieldsetElements = formElement.querySelectorAll(`fieldset`);
  const formSelectElements = formElement.querySelectorAll(`select`);
  const formSelectFieldsetArray = Array.from(formFieldsetElements) + Array.from(formSelectElements);
  console.log(formSelectFieldsetArray);*/

  window.disable = {
    set,
    unset
    // resetForm
  };

})();
