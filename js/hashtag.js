'use strict';
(function () {
  var MAX_HASHTAG = 5;
  var MAX_HASHTAG_LETTERS = 20;
  var MAX_LENGTH_COMMENT = 140;
  var hashtagInputText = document.querySelector('.text__hashtags');
  var hashtagInputButton = document.querySelector('.img-upload__submit');
  var textArea = document.querySelector('textarea[name="description"]');

  hashtagInputButton.addEventListener('click', function () {
    var hashtagsInput = hashtagInputText.value.trim();
    var newLowerHashtags = hashtagsInput.toLowerCase();
    hashtagInputText.value = newLowerHashtags;
    var hashtags = hashtagInputText.value.split(' ');

    if (!hashtags[0]) {
      hashtagInputText.setCustomValidity('');
      return;
    } else if (hashtags.length > MAX_HASHTAG) {
      hashtagInputText.setCustomValidity('Максимум хэштегов: 5');
    } else {
      hashtagInputText.setCustomValidity('');
    }

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].charAt(0) !== '#') {
        hashtagInputText.setCustomValidity('Хэштег начинается с # - ' + hashtags[i]);
      } else if (hashtags[i].length > MAX_HASHTAG_LETTERS) {
        hashtagInputText.setCustomValidity('Максимум 20 символов, включая решётку - ' + hashtags[i]);
      } else if (hashtags[i].length < 2) {
        hashtagInputText.setCustomValidity('Хештег не должен состоять из одной решётки - ' + hashtags[i]);
      } else if (hashtags[i].indexOf('#', 1) !== -1) {
        hashtagInputText.setCustomValidity('Хэштеги должны разделяться пробелом');
      }
      for (var j = i; j < hashtags.length - 1; j++) {
        if (hashtags[j + 1] === hashtags[i]) {
          hashtagInputText.setCustomValidity('Хештеги должны не повторяться - ' + hashtags[i]);
        }
      }
    }
  });

  hashtagInputText.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.form.uploadEscPress);
  });

  hashtagInputText.addEventListener('blur', function () {
    document.addEventListener('keydown', window.form.uploadEscPress);
  });

  // --------------------------------------

  function commentsLengthVCheck(length) {
    var messageLength = '';

    if (length > MAX_LENGTH_COMMENT) {
      messageLength = 'Максимум доступно 140 символов';
    }

    textArea.setCustomValidity(messageLength);
    if (messageLength) {
      textArea.classList.add('text--invalid');
    } else {
      textArea.classList.remove('text--invalid');
    }
  }

  textArea.addEventListener('input', function (evt) {
    var commentLength = evt.target.value.length;
    commentsLengthVCheck(commentLength);
  });

  textArea.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.form.uploadEscPress);
  });

  textArea.addEventListener('blur', function () {
    document.addEventListener('keydown', window.form.uploadEscPress);
  });
  // ---------------------------------------

  function closeSuccess() {
    document.removeEventListener('click', onSuccessClick);
    document.querySelector('main').removeChild(document.querySelector('main').querySelector('.success'));
  }

  function onSuccessClick(evt) {
    var successInnerMain = document.querySelector('main').querySelector('.success__inner');
    if (evt.target !== successInnerMain) {
      closeSuccess();
    }
  }

  function onSuccessEsc(evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeSuccess();
    }
  }

  function closePopup() {
    imgUploadForm.reset();
    window.form.uploadOverlay.classList.add('hidden');
    window.form.imgPreviewElement.style = '';
    hashtagInputText.classList.remove('border-red');
  }

  var templateError = document.querySelector('#error')
      .content
      .querySelector('.error');

  function closeError() {
    document.removeEventListener('click', onErrorClick);
    document.querySelector('main').removeChild(document.querySelector('main').querySelector('.error'));
  }

  function onErrorClick(evt) {
    var errorInnerMain = document.querySelector('main').querySelector('.error__inner');
    if (evt.target !== errorInnerMain) {
      closeError();
    }
  }

  function onErrorEsc(evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      closeError();
    }
  }

  function openError(errorNode) {
    var openErrorTemplate = templateError.cloneNode(true);
    document.querySelector('main').appendChild(openErrorTemplate);
    var openBtnError = openErrorTemplate.querySelectorAll('.error__button');
    openBtnError[0].focus();
    if (errorNode) {
      openErrorTemplate.querySelector('.error__title').innerHTML = errorNode;
      openErrorTemplate.querySelector('.error__title').style = 'font-size: 20px';
    }

    openBtnError.forEach(function (evtBtn) {
      evtBtn.addEventListener('click', function () {
        closeError();
      });
    });
    document.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onErrorEsc);
  }

  var templateSuccess = document.querySelector('#success')
      .content
      .querySelector('.success');

  function openSuccess() {
    document.addEventListener('keydown', window.form.uploadEscPress);
    window.form.resetFilter();
    var openedSuccessTenplate = templateSuccess.cloneNode(true);
    document.querySelector('main').appendChild(openedSuccessTenplate);
    var openedBtn = openedSuccessTenplate.querySelector('.success__button');
    openedBtn.focus();
    openedBtn.addEventListener('click', function () {
      closeSuccess();
    });
    document.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessEsc);
  }

  var imgUploadForm = document.querySelector('.img-upload__form');
  imgUploadForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(imgUploadForm), function () {
      closePopup();
      openSuccess();
    },
    function () {
      closePopup();
      openError();
    });
    evt.preventDefault();
  });
})();
