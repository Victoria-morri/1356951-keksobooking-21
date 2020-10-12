'use strict';

(function () {
  const interactive = function (pins, cards) {
    for (let i = 1; i < pins.length; i++) {
      let currentPin = pins[i];
      let currentCard = cards[i - 1];
      currentPin.addEventListener(`click`, function () {
        const closePopupCard = function (elementClose) {
          elementClose.hidden = true;
          document.removeEventListener(`keydown`, onPopupEscPress);
        };
        const openPopupCard = function (elementOpen) {
          elementOpen.hidden = false;
          document.addEventListener(`keydown`, onPopupEscPress);
        };

        const onPopupEscPress = function (evt) {
          if (evt.key === `Escape`) {
            evt.preventDefault();
            closePopupCard(currentCard);
          }
        };
        cards.forEach(function (popupElement) {
          if (!popupElement.hidden) {
            closePopupCard(popupElement);
          }
        });
        openPopupCard(currentCard);
        const closeCardButton = currentCard.querySelector(`.popup__close`);
        closeCardButton.addEventListener(`click`, function () {
          closePopupCard(currentCard);
        });

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
