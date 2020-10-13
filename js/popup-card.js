'use strict';

(function () {
  const interactive = function (pins, cards) {
    for (let i = 1; i < pins.length; i++) {
      let currentPin = pins[i];
      let currentCard = cards[i - 1];
      currentPin.addEventListener(`click`, function () {
        const closePopupCard = function () {
          currentCard.hidden = true;
          document.removeEventListener(`keydown`, onPopupEscPress);
          closeCardButton.removeEventListener(`click`, closePopupCard);
        };
        const openPopupCard = function () {
          currentCard.hidden = false;
          document.addEventListener(`keydown`, onPopupEscPress);
        };

        const onPopupEscPress = function (evt) {
          if (evt.key === `Escape`) {
            evt.preventDefault();
            closePopupCard();
          }
        };
        cards.forEach(function (popupElement) {
          if (!popupElement.hidden) {
            popupElement.hidden = true;
          }
        });
        openPopupCard();
        const closeCardButton = currentCard.querySelector(`.popup__close`);
        closeCardButton.addEventListener(`click`, closePopupCard);
      });
    }
  };

  const error = function (errorMessage) {
    if (errorMessage) {
      errorMessage.classList.add(`hidden`);
    }
  };
  window.popupCard = {
    interactive,
    error
  };

})();
