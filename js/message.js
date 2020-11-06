'use strict';
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


