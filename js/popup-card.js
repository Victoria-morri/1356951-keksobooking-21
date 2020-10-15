'use strict';

(function () {

  const closeCard = function () {
    activeCard.hidden = true;
    activePin.classList.remove(`map__pin--active`);
  };

  const getInteractive = function (pins, cards) {
    for (let i = 1; i < pins.length; i++) {
      let currentPin = pins[i];
      let currentCard = cards[i - 1];
      currentPin.addEventListener(`click`, function () {
        if (activePin) {
          activePin.classList.remove(`map__pin--active`);
        }
        activePin = currentPin;
        activeCard = currentCard;
        const closePopupCard = function () {
          currentCard.hidden = true;
          activePin.classList.remove(`map__pin--active`);
          document.removeEventListener(`keydown`, onPopupEscPress);
          closeCardButton.removeEventListener(`click`, closePopupCard);
        };
        const openPopupCard = function () {
          currentCard.hidden = false;
          currentPin.classList.add(`map__pin--active`);
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

  let activePin;
  let activeCard;

  window.popupCard = {
    getInteractive,
    error,
    closeCard
  };

})();
