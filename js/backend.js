'use strict';
(function () {
  var TIMEOUT = 10000;
  var SUCCESS_STATUS = 200;

  var Url = {
    UPLOAD: 'https://js.dump.academy/kekstagram',
    DATA: 'https://js.dump.academy/kekstagram/data'
  };

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

  function save(data, onLoad, onError) {
    var xhr = serverRequest(onLoad, onError);
    xhr.open('POST', Url.UPLOAD);
    xhr.send(data);
  }

  function load(onLoad, onError) {
    var xhr = serverRequest(onLoad, onError);
    xhr.open('GET', Url.DATA);
    xhr.send();
  }

  window.backend = {
    save: save,
    load: load
  };
})();

