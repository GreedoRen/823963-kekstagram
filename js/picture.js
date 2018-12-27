'use strict';
(function () {
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('#picture-cancel');
  var pictureBody = document.querySelector('body');

  function showBigPicture() {
    bigPicture.classList.remove('hidden');
    pictureBody.classList.add('modal-open');
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
  function getBigPicture(object) {
    showBigPicture();
    bigPicture.querySelector('.big-picture__img img').src = object.url;
    bigPicture.querySelector('.likes-count').textContent = object.likes;
    bigPicture.querySelector('.comments-count').textContent = window.data.pictureArrayQuantity[window.data.getNumber(0, 24)].comments.length;
    bigPicture.querySelector('.social__caption').textContent = window.data.pictureArrayQuantity[window.data.getNumber(0, 24)].description;
    bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
    bigPicture.querySelector('.comments-loader').classList.add('visually-hidden');
  }

  function getCommentList() {
    var commentList = document.querySelector('.social__comments');
    var listOfComments = '<li class="social__comment"><img class="social__picture" src="img/avatar-' + window.data.getNumber(1, 6) + '.svg" alt="Аватар комментатора фотографии"width="35" height="35"><p class="social__text">'
       + window.data.pictureArrayQuantity[window.data.getNumber(0, 24)].comments + '</p></li>';
    commentList.insertAdjacentHTML('beforeend', listOfComments);
  }

  getCommentList();


  window.picture = {
    getBigPicture: getBigPicture
  };
})();

