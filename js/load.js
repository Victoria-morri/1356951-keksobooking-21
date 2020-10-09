'use strict';

(function () {


  window.load = function (onSuccess, parent, onError) {
    const URL = `https://21.javascript.pages.academy/keksobooking/data`;
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      const error = ``;

      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response, parent);
          break;
        case 400:
          error = `Неверный запрос`;
          break;
        case 401:
          error = `Пользователь не авторизован`;
          break;
        case 404:
          error = `Ничего не найдено`;
          break;

        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });
    xhr.open(`GET`, URL);
    xhr.send();
  };

})();
