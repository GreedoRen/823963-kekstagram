'use strict';
var MIN_LIKE = 15;
var MAX_LIKE = 200;
var PICTURE_QUANTITY = 25;
var comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var description = [
  'Тестим новую камеру!',
  'Затусили с друзьями на море',
  'Как же круто тут кормят',
  'Отдыхаем...',
  'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
  'Вот это тачка!'
];

function getUrl(i) {
  return 'photos/' + (i + 1) + '.jpg';
}

function getNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomArray(array) {
  return array[(Math.floor(Math.random() * array.length))];
}

function getDescription() {
  return getRandomArray(description);
}
function getArrayComments() {
  return getRandomArray(comments);
}

function getPictureArray() {
  var pictureArray = [];
  for (var i = 0; i < PICTURE_QUANTITY; i++) {
    pictureArray.push({
      url: getUrl(i),
      likes: getNumber(MIN_LIKE, MAX_LIKE),
      comments: getArrayComments(),
      description: getDescription()
    });
  }
  return pictureArray;
}

var pictureArrayQuantity = getPictureArray(PICTURE_QUANTITY);

function getPicture(object, template) {
  var objectElement = template.cloneNode(true);
  objectElement.querySelector('.picture__img').src = object.url;
  objectElement.querySelector('.picture__likes').textContent = object.likes;
  objectElement.querySelector('.picture__comments').textContent = object.comment;

  objectElement.querySelector('.picture').addEventListener('click', function () {
    getBigPicture();
  });

  return objectElement;
}

function getFragmentPictures(array, template) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(getPicture(array[i], template));
  }
  return fragment;
}

var pictureTemplate = document.querySelector('#picture').content;

var fragmentPictures = getFragmentPictures(pictureArrayQuantity, pictureTemplate);
var listPictureElement = document.querySelector('.pictures');
listPictureElement.appendChild(fragmentPictures);

var bigPicture = document.querySelector('.big-picture');
var bigPictureClose = bigPicture.querySelector('#picture-cancel');

function showBigPicture() {
  bigPicture.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', hideBigPictureHandler);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', hideBigPictureHandler);
}

function hideBigPictureHandler(hide) {
  if (hide.keyCode === 27) {
    closeBigPicture();
  }
}

bigPictureClose.addEventListener('click', closeBigPicture);
function getBigPicture() {
  showBigPicture();
  bigPicture.querySelector('.big-picture__img img').src = pictureArrayQuantity[getNumber(0, 24)].url;
  bigPicture.querySelector('.likes-count').textContent = pictureArrayQuantity[getNumber(0, 24)].likes;
  bigPicture.querySelector('.comments-count').textContent = pictureArrayQuantity[getNumber(0, 24)].comments.length;
  bigPicture.querySelector('.social__caption').textContent = pictureArrayQuantity[getNumber(0, 24)].description;
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
}

function getCommentList() {
  var commentList = document.querySelector('.social__comments');
  var listOfComments = '<li class="social__comment"><img class="social__picture" src="img/avatar-' + getNumber(1, 6) + '.svg" alt="Аватар комментатора фотографии"width="35" height="35"><p class="social__text">'
     + pictureArrayQuantity[getNumber(0, 24)].comments + '</p></li>';
  commentList.insertAdjacentHTML('beforeend', listOfComments);
}

getCommentList();

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
var valueSizeMin = 25;
var valueSizeMax = 100;
var valueSizeStep = 25;

function uploadFormEscPress(evt) {
  if (evt.keyCode === 27) {
    uploadInput.value = '';
    uploadFormClose();
  }
}

function uploadFormOpen() {
  uploadOverlay.classList.remove('hidden');
  effectLevelSlider.style.display = 'none';
  uploadOverlay.querySelector('.img-upload__cancel').addEventListener('click', uploadFormClose);
  document.addEventListener('keydown', uploadFormEscPress);
}

function uploadFormClose() {
  uploadOverlay.classList.add('hidden');
  uploadInput.value = '';
  document.removeEventListener('keydown', uploadFormEscPress);
}

function photoSizeChanging(step) {
  var currentSize = parseInt(scaleControlValue.value, 10);
  currentSize = currentSize + (valueSizeStep * step);
  if (currentSize >= valueSizeMin && currentSize <= valueSizeMax) {
    scaleControlValue.value = currentSize + '%';
    imgPreviewElement.style.transform = 'scale(' + currentSize / 100 + ')';
  }
}

scaleControlSmaller.addEventListener('click', function () {
  photoSizeChanging(-1);
});

scaleControlBigger.addEventListener('click', function () {
  photoSizeChanging(1);
});

uploadInput.addEventListener('change', uploadFormOpen);
Array.prototype.forEach.call(effectsItem, function (item) {
  item.addEventListener('click', function (evt) {
    evt.preventDefault();
    imgPreviewElement.classList = '';
    var effect = item.querySelector('input').value;
    imgPreviewElement.style = '';
    pinEffect.style.left = '100%';
    effectDepth.style.width = '100%';
    effectLevelValue.value = 100;
    imgPreviewElement.classList.add('effects__preview--' + effect);
    if (effect === 'none') {
      effectLevelSlider.style.display = 'none';
    } else {
      effectLevelSlider.style.display = 'block';
    }
  });
});

function getEffectLevel(current, max) {
  return Math.round(current * 100 / max);
}

function filterEffects() {
  var effectLevel = getEffectLevel(pinEffect.offsetLeft, effectLine.offsetWidth);
  effectLevelValue.value = effectLevel;
  if (imgPreviewElement.matches('.effects__preview--chrome')) {
    imgPreviewElement.style.filter = 'grayscale(' + 1 / 100 * effectLevel + ')';
  } else if (imgPreviewElement.matches('.effects__preview--sepia')) {
    imgPreviewElement.style.filter = 'sepia(' + 1 / 100 * effectLevel + ')';
  } else if (imgPreviewElement.matches('.effects__preview--marvin')) {
    imgPreviewElement.style.filter = 'invert(' + effectLevel + '%)';
  } else if (imgPreviewElement.matches('.effects__preview--phobos')) {
    imgPreviewElement.style.filter = 'blur(' + 3 / 100 * effectLevel + 'px)';
  } else if (imgPreviewElement.matches('.effects__preview--heat')) {
    imgPreviewElement.style.filter = 'brightness(' + 3 / 100 * effectLevel + ')';
  } else {
    imgPreviewElement.style.filter = '';
  }
}

function dragImageEffects() {
  pinEffect.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startPosition = {
      x: evt.clientX,
    };

    function mouseMove(move) {
      move.preventDefault();
      var shiftPosition = {
        x: startPosition.x - move.clientX,
      };
      startPosition = {
        x: move.clientX,
      };
      pinEffect.style.left = (pinEffect.offsetLeft - shiftPosition.x) + 'px';
      effectDepth.style.width = pinEffect.offsetLeft + 'px';
      if (pinEffect.offsetLeft - shiftPosition.x < 0) {
        pinEffect.style.left = 0 + 'px';
        document.removeEventListener('mousemove', mouseMove);
      } else if (pinEffect.offsetLeft > effectLine.offsetWidth) {
        pinEffect.style.left = effectLine.offsetWidth + 'px';
        document.removeEventListener('mousemove', mouseMove);
      }
      filterEffects();
    }

    function mouseUp(up) {
      up.preventDefault();
      filterEffects();
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);
    }

    document.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseup', mouseUp);
  });
}
dragImageEffects();
