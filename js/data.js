'use strict';
(function () {
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

  function getPicture(object) {
    var objectElement = pictureTemplate.cloneNode(true);
    objectElement.querySelector('.picture__img').src = object.url;
    objectElement.querySelector('.picture__likes').textContent = object.likes;
    objectElement.querySelector('.picture__comments').textContent = object.comment;

    objectElement.querySelector('.picture').addEventListener('click', function () {
      window.picture.getBigPicture(object);
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

  window.data = {
    pictureArrayQuantity: pictureArrayQuantity,
    getNumber: getNumber
  };
})();

