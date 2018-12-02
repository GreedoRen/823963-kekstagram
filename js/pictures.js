'use strict';
var minLike = 15;
var maxLike = 200;
var pictureQuantity = 25;
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
  return ('photos/' + (i + 1) + '.jpg');
}

function getNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomArray(array) {
  return array[(Math.floor(Math.random() * array.length))];
}

function getLikesQuantity() {
  return getNumber(minLike, maxLike);
}

function getComments() {
  return getRandomArray(comments);
}

function getDescription() {
  return getRandomArray(description);
}

var getPictureArray = function (pictureQuantity) {
  var pictureArray = [];
  for (var i = 0; i < pictureQuantity; i++) {
    var pictureUrlObject = getUrl(i);
    var pictureLikesObject = getLikesQuantity();
    var pictureCommentsObject = getNumber(1, 5);
    var pictureDescriptionObject = getDescription();
    var arrayComments = [];

    for (var k = 0; k < pictureCommentsObject; k++) {
      arrayComments[k] = getComments();
    }

    pictureArray[i] = {
      url: pictureUrlObject,
      likes: pictureLikesObject,
      comments: arrayComments,
      description:pictureDescriptionObject
    };
  }
  return pictureArray;
};

var pictureArrayQuantity = getPictureArray(pictureQuantity);


var getPicture = function (object, template) {
  var objectElement = template.cloneNode(true);
  objectElement.querySelector('.picture__img').src = object.url;
  objectElement.querySelector('.picture__likes').textContent = object.likes;
  objectElement.querySelector('.picture__comments').textContent = object.comment;

  return objectElement;
};

var getFragmentPictures = function (array, template) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < array.length; i++) {
    fragment.appendChild(getPicture(array[i], template));
  }
  return fragment;
};

var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var fragmentPictures = getFragmentPictures(pictureArrayQuantity, pictureTemplate);
var listPictureElement = document.querySelector('.pictures');
listPictureElementment.appendChild(fragmentPictures);

var bigPicture = document.querySelector('.big-picture');
bigPicture.classList.remove('hidden');
bigPicture.querySelector('.big-picture__img img').src = pictureArrayQuantity[getNumber(0, 24)].url;
bigPicture.querySelector('.likes-count').textContent = pictureArrayQuantity[getNumber(0, 24)].likes;
bigPicture.querySelector('.comments-count').textContent = pictureArrayQuantity[getNumber(0, 24)].comments.length;

var commentsList = '';
for (var i = 0; i < pictureArrayQuantity[0].comments.length; i++) {
  commentsList = commentsList + '<li class="social__comment"><img class="social__picture" src="img/avatar-'
+ getNumber(1, 6) + '.svg" alt="Аватар комментатора фотографии" width="35" height="35"><p class="social__text">'
+ pictureArrayQuantity[0].comments[i] + '</p></li>';
}
bigPicture.querySelector('.social__comments').innerHTML = commentsList;

bigPicture.querySelector('.social__caption').textContent = pictureArrayQuantity[getNumber(0, 24)].description;

bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
