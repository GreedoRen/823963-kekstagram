'use strict';
(function () {
  var randomPhoto = {
    MIN: 0,
    MAX: 10
  };
  var imgFiltersForm = document.querySelector('.img-filters__form');
  var imgFiltersButton = imgFiltersForm.querySelectorAll('.img-filters__button');
  var picture = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');
  var pictureList = [];

  function getNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getPicture(object) {
    var objectElement = pictureTemplate.cloneNode(true);
    objectElement.querySelector('.picture__img').src = object.url;
    objectElement.querySelector('.picture__likes').textContent = object.likes;
    objectElement.querySelector('.picture__comments').textContent = object.comments.length;

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
    getFragmentPictures(data);
    filters.classList.remove('img-filters--inactive');
    pictureList = data;
    filter(pictureList);
  };


  // ---------------------------
  var sortComments = function (posts) {
    return posts.slice().sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
  };

  function filter(photos) {
    var addNewPhoto = function (photo) {
      return window.util.shuffleArray(photo).slice(randomPhoto.MIN, randomPhoto.MAX);
    };

    var sortPhoto = function (evt) {
      var target = evt.target;
      var picturesAll = picture.querySelectorAll('.picture');
      picturesAll.forEach(function (item) {
        picture.removeChild(item);
      });
      switch (target.id) {
        case 'filter-popular':
          getFragmentPictures(photos);
          break;
        case 'filter-new':
          getFragmentPictures(addNewPhoto(photos));
          break;
        case 'filter-discussed':
          getFragmentPictures(sortComments(photos));
          break;
      }
    };

    var debounceFilters = window.debounce(sortPhoto);
    imgFiltersForm.addEventListener('click', function (evt) {
      var target = evt.target;
      setClass(target.id);
      debounceFilters(evt);
    });

    var setClass = function (currentFilter) {
      imgFiltersButton.forEach(function (item) {
        item.classList.remove('img-filters__button--active');
      });
      imgFiltersForm.querySelector('#' + currentFilter).classList.add('img-filters__button--active');
    };
  }
  // ---------------------------
  window.backend.load(onLoad, onError);


  window.data = {
    getNumber: getNumber,
    pictureList: pictureList
  };
})();

