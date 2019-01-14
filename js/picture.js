'use strict';
(function () {
  var COMMENTS_MAX = 5;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('#picture-cancel');
  var picture = {};
  var bigPictureComments = document.querySelector('.social__comments');
  var bigPictureCommentsLoader = bigPicture.querySelector('.social__comments-loader');
  var bigPictureCommentCount = bigPicture.querySelector('.social__comment-count');
  var countIndexComments = 0;
  var arrayComments = [];

  function showBigPicture() {
    bigPicture.classList.remove('hidden');
    document.addEventListener('keydown', hideBigPictureHandler);
  }

  function closeBigPicture() {
    bigPicture.classList.add('hidden');
    reset();
    document.querySelector('body').classList.remove('modal-open');
    document.removeEventListener('keydown', hideBigPictureHandler);
  }

  function hideBigPictureHandler(hide) {
    if (hide.keyCode === window.util.ESC_KEYCODE) {
      closeBigPicture();
    }
  }

  bigPictureClose.addEventListener('click', closeBigPicture);
  function getBigPic(object) {
    showBigPicture();
    picture = object;
    bigPicture.querySelector('.big-picture__img img').src = object.url;
    bigPicture.querySelector('.likes-count').textContent = object.likes;
    bigPicture.querySelector('.social__caption').textContent = object.description;
    loadNewComments();

    if (picture.comments.length <= (countIndexComments)) {
      bigPictureCommentsLoader.classList.add('visually-hidden');
    }
  }

  // -----------------------
  function createCommentTemplate(comments) {
    var liElement = window.util.createElement('li', 'social__comment');

    var avatar = window.util.createElement('img', 'social__picture');
    avatar.src = comments.avatar;
    avatar.alt = 'Аватар';
    liElement.appendChild(avatar);

    var textComments = window.util.createElement('p', 'social__text', comments.message);
    liElement.appendChild(textComments);

    return liElement;
  }

  function addComments(objects) {
    while (bigPictureComments.firstChild) {
      bigPictureComments.removeChild(bigPictureComments.firstChild);
    }
    var fragment = document.createDocumentFragment();
    objects.forEach(function (object) {
      var commentsItem = createCommentTemplate(object);
      fragment.appendChild(commentsItem);
    });
    bigPictureComments.appendChild(fragment);
  }

  function reset() {
    arrayComments = [];
    countIndexComments = 0;
    bigPictureCommentsLoader.classList.remove('visually-hidden');
  }

  function loadNewComments() {
    var partComments = picture.comments.slice(countIndexComments, countIndexComments + COMMENTS_MAX);
    partComments.forEach(function (partComment) {
      arrayComments.push(partComment);
    });
    addComments(arrayComments);
    countIndexComments += COMMENTS_MAX;

    var commentsLength = picture.comments.length;
    var openComments = bigPictureComments.childNodes.length;
    bigPictureCommentCount.innerHTML = openComments + ' из <span class="comments-count">' + commentsLength + '</span> комментариев</div>';
  }

  function commentsHandler() {
    loadNewComments();
    if (picture.comments.length <= (countIndexComments)) {
      bigPictureCommentsLoader.classList.add('visually-hidden');
    }
  }

  bigPictureCommentsLoader.addEventListener('click', commentsHandler);

  // -----------------------

  window.picture = {
    getBigPic: getBigPic
  };
})();

