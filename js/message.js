'use strict';
(function () {
  const onPressEsc2 = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      onFormUnsendMessage();
    }
  };

  const onFormUnsendMessage = function () {
    document.body.removeChild(failMessage);
    document.removeEventListener(`click`, onFormUnsendMessage);
    document.removeEventListener(`keydown`, onPressEsc2);
  };

  const onPressEsc = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      onFormSendMessage();
    }
  };

  const onFormSendMessage = function () {
    document.body.removeChild(successMessage);
    document.removeEventListener(`click`, onFormSendMessage);
    document.removeEventListener(`keydown`, onPressEsc);
  };

  const failElement = document.querySelector(`#error`).content.querySelector(`.error`);
  const failMessage = failElement.cloneNode(true);
  const errorButton = failMessage.querySelector(`.error__button`);
  const successElement = document.querySelector(`#success`).content.querySelector(`.success`);
  const successMessage = successElement.cloneNode(true);

  const showError = function () {
    document.body.appendChild(failMessage);
    document.addEventListener(`click`, onFormUnsendMessage);
    document.addEventListener(`keydown`, onPressEsc2);
    errorButton.addEventListener(`click`, onFormUnsendMessage);
  };

  const showSuccess = function () {
    document.body.appendChild(successMessage);
    document.addEventListener(`click`, onFormSendMessage);
    document.addEventListener(`keydown`, onPressEsc);
  };

  window.message = {
    showSuccess,
    showError
  };
})();

