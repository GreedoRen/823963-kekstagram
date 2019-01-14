'use strict';
(function () {
  var RandomPhoto = {
    MIN: 0,
    MAX: 10
  };
  var imgFiltersForm = document.querySelector('.img-filters__form');
  var imgFiltersButton = imgFiltersForm.querySelectorAll('.img-filters__button');
  var picture = document.querySelector('.pictures');
  var filters = document.querySelector('.img-filters');
  var picturesList = [];

  function getNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  function getPicture(object) {
    var objectElement = pictureTemplate.cloneNode(true);
    objectElement.querySelector('.picture__img').src = object.url;
    objectElement.querySelector('.picture__likes').textContent = object.likes;
    objectElement.querySelector('.picture__comments').textContent = object.comments.length;

    objectElement.querySelector('.picture').addEventListener('click', function () {
      window.picture.getBigPic(object);
    });

    return objectElement;
  }

  function getFragmentPictures(array) {
    var fragment = document.createDocumentFragment();
    array.forEach(function (template) {
      fragment.appendChild(getPicture(template));
    });
    document.querySelector('.pictures').appendChild(fragment);
  }

  var pictureTemplate = document.querySelector('#picture').content;

  function onError(error) {
    var node = document.createElement('div');
    node.style.position = 'absolute';
    node.style = 'margin: 0 auto; text-align: center; background-color: red; z-index: 10;';
    node.style.fontSize = '20px';
    node.textContent = error;
    document.body.insertAdjacentElement('afterbegin', node);
  }

  function onLoad(data) {
    getFragmentPictures(data);
    filters.classList.remove('img-filters--inactive');
    picturesList = data;
    filter(picturesList);
  }


  // ---------------------------
  function sortComments(posts) {
    return posts.slice().sort(function (first, second) {
      return second.comments.length - first.comments.length;
    });
  }

  function filter(photos) {
    var addNewPhoto = function (photo) {
      return window.util.shuffleArray(photo).slice(RandomPhoto.MIN, RandomPhoto.MAX);
    };

    function sortPhoto(evt) {
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
    }

    var debounceFilters = window.debounce.cb(sortPhoto);
    imgFiltersForm.addEventListener('click', function (evt) {
      var target = evt.target;
      setClass(target.id);
      debounceFilters(evt);
    });

    function setClass(currentFilter) {
      imgFiltersButton.forEach(function (item) {
        item.classList.remove('img-filters__button--active');
      });
      imgFiltersForm.querySelector('#' + currentFilter).classList.add('img-filters__button--active');
    }
  }
  // ---------------------------
  window.backend.load(onLoad, onError);


  window.data = {
    getNumber: getNumber,
    picturesList: picturesList
  };
})();

