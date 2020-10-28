'use strict';

(function () {

  const onCloseCard = function () {
    if (activeCard) {
      activeCard.hidden = true;
      activePin.classList.remove(`map__pin--active`);
      document.removeEventListener(`keydown`, onPopupEscPress);
      closeCardButton.removeEventListener(`click`, onCloseCard);
      activeCard = ``;
      activePin = ``;
    }
  };

  const openPopupCard = function (card, pin) {
    activeCard = card;
    activePin = pin;
    card.hidden = false;
    activePin.classList.add(`map__pin--active`);
    document.addEventListener(`keydown`, onPopupEscPress);
    closeCardButton = activeCard.querySelector(`.popup__close`);
    closeCardButton.addEventListener(`click`, onCloseCard);
  };

  const onPopupEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      onCloseCard();
    }
  };
  const getInteractive = function (pins, cards) {
    for (let i = 1; i < pins.length; i++) {
      let currentPin = pins[i];
      let currentCard = cards[i - 1];
      currentPin.addEventListener(`click`, function () {
        if (activePin) {
          activePin.classList.remove(`map__pin--active`);
        }

        cards.forEach(function (popupElement) {
          if (!popupElement.hidden) {
            popupElement.hidden = true;
          }
        });
        openPopupCard(currentCard, currentPin);
      });
    }
  };

  const error = function (errorMessage) {
    if (errorMessage) {
      errorMessage.classList.add(`hidden`);
    }
  };

  let closeCardButton;
  let activePin;
  let activeCard;

  window.popupCard = {
    getInteractive,
    error,
    onCloseCard
  };

})();
