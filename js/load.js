'use strict';
const OK = 200;
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;

window.load = function ({onSuccess, onError, url, method, dataX}) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    let error = ``;

    switch (xhr.status) {
      case OK:
        onSuccess(xhr.response);
        break;
      case BAD_REQUEST:
        error = `Неверный запрос`;
        break;
      case UNAUTHORIZED:
        error = `Пользователь не авторизован`;
        break;
      case NOT_FOUND:
        error = `Ничего не найдено`;
        break;

      default:
        error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
    }
    if (error) {
      onError(error);
    }
  });

  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });
  xhr.open(method, url); // `GET`
  xhr.send(dataX);
};


