'use strict';

(function () {
  window.load = function (onSuccess) {
    const URL = `https://21.javascript.pages.academy/keksobooking/data`;
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      onSuccess(xhr.response);
    });
    xhr.open(`GET`, URL);
    xhr.send();
  };
})();
