'use strict';

(function () {
// const popupClose = window.card.mapCardTemplate.querySelector(`.popup__close`);

  const openPopupCard = function (popupElement) {
    if (popupElement.includes(popupElement.className !== `hidden` && popupElement.className !== `map__pin--main`)) {
      popupElement.classList.add(`hidden`);
    }

  };

  /*

    const popupCloseElements = document.querySelectorAll(`.popup__close`);
    for (let i = 0; i < popupCloseElements.length; i++) {
      popupCloseElements[i].addEventListener(`click`, function () {
        closePopup(popupElements[i]);
      });
      document.addEventListener(`keydown`, function (evt) {
        if (evt.key === `Escape`) {
          closePopup(popupElements[i]);
        }
      });
    }*/
  window.popupCard = {
    openPopupCard
  };

})();
