'use strict';

(function () {
  window.load = function (onSuccess, parent) {
    const URL = `https://21.javascript.pages.academy/keksobooking/data`;
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      onSuccess(xhr.response, parent);
    });
    xhr.open(`GET`, URL);
    xhr.send();
  };
})();
