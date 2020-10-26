'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking`;

  window.upload = function (dataX, success, fail) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;
    xhr.addEventListener(`load`, function () {
      const error = ``;

      switch (xhr.status) {
        case 200:
          success();
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
        fail();
      }
    });
    xhr.addEventListener(`error`, function () {
      fail();
    });
    xhr.open(`POST`, URL);
    xhr.send(dataX);
  };
})();
