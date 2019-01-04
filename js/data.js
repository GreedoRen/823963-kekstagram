'use strict';
(function () {
  // var photos = [];

  function getNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

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
    document.querySelector('.pictures').appendChild(fragment);
  }

  var pictureTemplate = document.querySelector('#picture').content;

  var onError = function (error) {
    var node = document.createElement('div');
    node.style.position = 'absolute';
    node.style = 'margin: 0 auto; text-align: center; background-color: red; z-index: 10;';
    node.style.fontSize = '20px';
    node.textContent = error;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onLoad = function (data) {
    // photos = data;
    getFragmentPictures(data);
    // return photos;
  };

  window.backend.load(onLoad, onError);


  window.data = {
    getNumber: getNumber
  };
})();

