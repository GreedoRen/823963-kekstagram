'use strict';
(function () {
  var UPLOAD_URL = 'https://js.dump.academy/kekstagram';
  var DATA_URL = 'https://js.dump.academy/kekstagram/data';
  var TIMEOUT = 10000;
  var SUCCESS_STATUS = 200;

  function serverRequest(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === SUCCESS_STATUS) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }

    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    return xhr;
  }

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = serverRequest(onLoad, onError);
      xhr.open('POST', UPLOAD_URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = serverRequest(onLoad, onError);
      xhr.open('GET', DATA_URL);
      xhr.send();
    },
  };

})();

