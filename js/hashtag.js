'use strict';
(function () {
  var MAX_HASHTAG = 5;
  var MAX_HASHTAG_LETTERS = 20;
  var hashtagInputText = document.querySelector('.text__hashtags');
  var hashtagInputButton = document.querySelector('.img-upload__submit');
  hashtagInputButton.addEventListener('click', function () {
    var hashtagsInput = hashtagInputText.value;
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
    document.removeEventListener('keydown', window.form.uploadFormEscPress);
  });

  hashtagInputText.addEventListener('blur', function () {
    document.addEventListener('keydown', window.form.uploadFormEscPress);
  });

  // --------------------------------------

  var closeSuccess = function () {
    document.removeEventListener('click', onSuccessClick);
    document.querySelector('main').removeChild(document.querySelector('main').querySelector('.success'));
  };

  var onSuccessClick = function (evt) {
    var successInnerMain = document.querySelector('main').querySelector('.success__inner');
    if (evt.target !== successInnerMain) {
      closeSuccess();
    }
  };

  var closePopup = function () {
    imgUploadForm.reset();
    window.form.uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', window.form.uploadFormEscPress);
    window.form.imgPreviewElement.style = '';
    hashtagInputText.classList.remove('border-red');
  };

  var templateError = document.querySelector('#error')
      .content
      .querySelector('.error');

  var closeError = function () {
    document.removeEventListener('click', onErrorClick);
    document.querySelector('main').removeChild(document.querySelector('main').querySelector('.error'));
  };

  var onErrorClick = function (evt) {
    var errorInnerMain = document.querySelector('main').querySelector('.error__inner');
    if (evt.target !== errorInnerMain) {
      closeError();
    }
  };

  function openError(errorNode) {
    var openErrorTemplate = templateError.cloneNode(true);
    document.querySelector('main').appendChild(openErrorTemplate);
    var openedBtnError = openErrorTemplate.querySelectorAll('.error__button');
    openedBtnError[0].focus();
    if (errorNode) {
      openErrorTemplate.querySelector('.error__title').innerHTML = errorNode;
      openErrorTemplate.querySelector('.error__title').style = 'font-size: 20px';
    }

    openedBtnError.forEach(function (evtBtn) {
      evtBtn.addEventListener('click', function () {
        closeError();
      });
    });
    document.addEventListener('click', onErrorClick);
  }

  var templateSuccess = document.querySelector('#success')
      .content
      .querySelector('.success');

  function openSuccess() {
    var openedSuccessTenplate = templateSuccess.cloneNode(true);
    document.querySelector('main').appendChild(openedSuccessTenplate);
    var openedBtn = openedSuccessTenplate.querySelector('.success__button');
    openedBtn.focus();
    openedBtn.addEventListener('click', function () {
      closeSuccess();
    });
    document.addEventListener('click', onSuccessClick);
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
