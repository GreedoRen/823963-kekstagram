'use strict';
(function () {
  var VALUE_SIZE_MIN = 25;
  var VALUE_SIZE_MAX = 100;
  var VALUE_SIZE_STEP = 25;
  var filters = {
    none: {
      className: 'effects__preview--none',
      filter: '',
      maxValue: 0
    },
    chrome: {
      className: 'effects__preview--chrome',
      filter: 'grayscale',
      minValue: '1',
      maxValue: '100',
      filterUnit: '',
    },
    sepia: {
      className: 'effects__preview--sepia',
      filter: 'sepia',
      minValue: '1',
      maxValue: '100',
      filterUnit: '',
    },
    marvin: {
      className: 'effects__preview--marvin',
      filter: 'invert',
      minValue: '1',
      maxValue: '1',
      filterUnit: '%',
    },
    phobos: {
      className: 'effects__preview--phobos',
      filter: 'blur',
      minValue: '3',
      maxValue: '100',
      filterUnit: 'px',
    },
    heat: {
      className: 'effects__preview--heat',
      filter: 'brightness',
      minValue: '3',
      maxValue: '100',
      filterUnit: '',
    }
  };
  var scaleControlSmaller = document.querySelector('.scale__control--smaller');
  var scaleControlBigger = document.querySelector('.scale__control--bigger');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var imgPreviewElement = document.querySelector('.img-upload__preview img');
  var effectLevelSlider = document.querySelector('.effect-level');
  var uploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadInput = document.querySelector('#upload-file');
  var effectsItem = document.querySelectorAll('.effects__item');
  var effectLine = document.querySelector('.effect-level__line');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var pinEffect = document.querySelector('.effect-level__pin');
  var effectDepth = effectLine.querySelector('.effect-level__depth');
  var imageUploadPreview = uploadOverlay.querySelector('.img-upload__preview img');
  var form = document.querySelector('.img-upload__form');

  function onUploadEscPress(evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      uploadInput.value = '';
      onUploadClose();
    }
  }

  function uploadFormOpen() {
    uploadOverlay.classList.remove('hidden');
    effectLevelSlider.style.display = 'none';
    uploadOverlay.querySelector('.img-upload__cancel').addEventListener('click', onUploadClose);
    document.addEventListener('keydown', onUploadEscPress);
  }

  function onUploadClose() {
    uploadOverlay.classList.add('hidden');
    uploadInput.value = '';
    resetFilter();
    document.removeEventListener('keydown', onUploadEscPress);
  }

  function changePhotoSize(step) {
    var currentSize = parseInt(scaleControlValue.value, 10);
    currentSize += VALUE_SIZE_STEP * step;
    if (currentSize >= VALUE_SIZE_MIN && currentSize <= VALUE_SIZE_MAX) {
      scaleControlValue.value = currentSize + '%';
      imgPreviewElement.style.transform = 'scale(' + currentSize / 100 + ')';
    }
  }

  scaleControlSmaller.addEventListener('click', function () {
    changePhotoSize(-1);
  });

  scaleControlBigger.addEventListener('click', function () {
    changePhotoSize(1);
  });

  uploadInput.addEventListener('change', function () {
    uploadFormOpen();
    window.upload.loadFile();
  });

  Array.from(effectsItem).forEach(function (item) {
    item.addEventListener('click', function (evt) {
      evt.preventDefault();
      imgPreviewElement.classList = '';
      var effect = item.querySelector('input').value;
      imgPreviewElement.style.filter = '';
      pinEffect.style.left = '100%';
      effectDepth.style.width = '100%';
      effectLevelValue.value = 100;
      imgPreviewElement.classList.add('effects__preview--' + effect);
      effectLevelSlider.style.display = (effect === 'none') ? 'none' : 'block';
    });
  });

  function getEffectLevel(current, max) {
    return Math.round(current * 100 / max);
  }
  // -----------------------

  function filterEffects(i) {
    var effectLevel = getEffectLevel(pinEffect.offsetLeft, effectLine.offsetWidth);
    effectLevelValue.value = effectLevel;
    for (i in filters) {
      if (imageUploadPreview.className === filters[i].className) {
        imageUploadPreview.style.filter = filters[i].filter + '(' + filters[i].minValue / filters[i].maxValue * effectLevel + filters[i].filterUnit + ')';
      }
    }
  }

  function resetFilter() {
    imageUploadPreview.className = 'effects__preview--none';
    imageUploadPreview.style.filter = '';
    imageUploadPreview.style.transform = '';
    form.reset();
  }

  // -------------------------
  function dragImageEffects() {
    pinEffect.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startPosition = {
        x: evt.clientX
      };

      function onMouseMove(move) {
        move.preventDefault();

        var shiftPosition = {
          x: startPosition.x - move.clientX,
        };
        startPosition = {
          x: move.clientX
        };

        pinEffect.style.left = (pinEffect.offsetLeft - shiftPosition.x) + 'px';
        effectDepth.style.width = pinEffect.offsetLeft + 'px';

        if (pinEffect.offsetLeft - shiftPosition.x < 0) {
          pinEffect.style.left = 0 + 'px';
          effectDepth.style.width = 0 + 'px';
        } else if (pinEffect.offsetLeft > effectLine.offsetWidth) {
          pinEffect.style.left = effectLine.offsetWidth + 'px';
          effectDepth.style.width = effectLine.offsetWidth + 'px';
        }


        filterEffects();
      }

      function onMouseUp(up) {
        up.preventDefault();
        filterEffects();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  }
  dragImageEffects();

  // ---------------------------------------

  window.form = {
    imgPreviewElement: imgPreviewElement,
    uploadOverlay: uploadOverlay,
    onUploadEscPress: onUploadEscPress,
    resetFilter: resetFilter

  };
})();
