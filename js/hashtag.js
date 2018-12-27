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
})();

