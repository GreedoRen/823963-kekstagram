'use strict';

(function () {
  function fileloader() {
    var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

    var imgPreviewFile = document.querySelector('.img-upload__preview img');
    var uploadFile = document.querySelector('#upload-file');
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imgPreviewFile.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  window.upload = {
    fileloader: fileloader
  };

})();

