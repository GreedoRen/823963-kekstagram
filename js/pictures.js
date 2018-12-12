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

  return objectElement;
}

function getFragmentPictures(array, template) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(getPicture(array[i], template));
  }
  return fragment;
}
// var picturesUsers = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content;

var fragmentPictures = getFragmentPictures(pictureArrayQuantity, pictureTemplate);
var listPictureElement = document.querySelector('.pictures');
listPictureElement.appendChild(fragmentPictures);

listPictureElement.addEventListener('click', function () {
  document.querySelector('.big-picture').classList.remove('hidden');
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 27) {
      document.querySelector('.big-picture').classList.add('hidden');
    }
  });
});

// document.querySelector('.big-picture').classList.remove('hidden');

var bigPicture = document.querySelector('.big-picture');
var bigPictureClose = bigPicture.querySelector('#picture-cancel');

function hideBigPictureHandler(hide) {
  if (hide.keyCode === 27) {
    closeBigPicture();
  }
}

function showBigPicture() {
  bigPicture.classList.remove('hidden');
  document.addEventListener('click', hideBigPictureHandler);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.removeEventListener('click', hideBigPictureHandler);
}

bigPictureClose.addEventListener('click', closeBigPicture);
function getBigPicture() {
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

getBigPicture();
getCommentList();
